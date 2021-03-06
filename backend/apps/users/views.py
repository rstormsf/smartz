from datetime import datetime
from typing import Dict

import pytz
from django.conf import settings
from django.db import transaction
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import View

from apps.common.constants import BLOCKCHAIN_ETHEREUM, BLOCKCHAIN_EOS
from apps.users.services import EthereumSignService, SignService, UsersService, EOSSignService
from smartzcore.exceptions import PublicException
from smartzcore.http import assert_swagger_schema_validated, error_response


class LoginBaseView(View):
    _sign_services: Dict[str, SignService] = {
        BLOCKCHAIN_ETHEREUM: EthereumSignService(),
        BLOCKCHAIN_EOS: EOSSignService(),
    }
    users_service = UsersService()

    def _require_service(self, blockchain):
        if blockchain not in self._sign_services:
            raise PublicException("Blockchain '{}' is not supported".format(blockchain))

        return self._sign_services[blockchain]


@method_decorator(csrf_exempt, name='dispatch')
@method_decorator(assert_swagger_schema_validated, name='dispatch')
class LoginStartView(LoginBaseView):
    def post(self, request):
        service = self._require_service(request.data.get('blockchain'))

        descr = service.get_descr(request.data.get('identity'))

        rand_data = service.get_rand_data(request.data.get('identity'), descr)
        return JsonResponse({
            "description": descr,
            "rand_data": rand_data.data,
            "blockchain": request.data.get('blockchain'),
            "identity": request.data.get('identity')
        })


@method_decorator(csrf_exempt, name='dispatch')
@method_decorator(assert_swagger_schema_validated, name='dispatch')
class LoginFinishView(LoginBaseView):

    @transaction.atomic
    def post(self, request):
        blockchain = request.data.get('blockchain')
        identity = request.data.get('identity')
        rand_data = request.data.get('rand_data')
        signed_data = request.data.get('signed_data')

        service = self._require_service(blockchain)

        is_valid = service.check_sign(identity, signed_data, rand_data)
        if not is_valid:
            return error_response("Incorrect signature")

        user = self.users_service.find_user(blockchain=blockchain, identity=identity)
        if not user:
            user = self.users_service.register_user(blockchain=blockchain, identity=identity)

        return JsonResponse({
            "token": self.users_service.generate_token(user, blockchain)
        })
