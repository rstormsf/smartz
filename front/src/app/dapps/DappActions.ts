// Fetching Dapps list
export const fetchDappsRequest = () => ({
  type: 'FETCH_DAPPS_REQUEST',
});

export const fetchDappsFailure = (error) => ({
  type: 'FETCH_DAPPS_FAILURE',
  error,
});

export const fetchDappsSuccess = (dapps) => ({
  type: 'FETCH_DAPPS_SUCCESS',
  dapps,
});
//

export const viewFuncResult = (dappId, funcName, result) => ({
  type: 'VIEW_FUNC_RESULT',
  dappId,
  funcName,
  result,
});

export const transactionNew = (dappId, result) => ({
  type: 'TRANSACTION_NEW',
  dappId,
  result,
});

// export const requestNew = (dappId, func, formData, result) => ({
//   type: 'REQUEST_NEW',
//   dappId,
//   func,
//   formData,
//   result
// });

export const requestAdd = (dappId, requests) => ({
  type: 'ADD_REQUESTS',
  dappId,
  requests,
});

export const transactionAdd = (dappId, transactions) => ({
  type: 'ADD_TRANSACTIONS',
  dappId,
  transactions,
});

export const transactionReceipt = (dappId, txHash, receipt) => ({
  type: 'TRANSACTION_RECEIPT',
  dappId,
  txHash,
  receipt,
});
