// src/actions/symbolActions.ts
import { Dispatch } from 'redux';

import API from '../utils/API'; // Import the API client
import { getTradingDataFail, getTradingDataStart, getTradingDataSuccess } from '../features/tradingData/tradingDataSlice';

// Action to fetch data for specific symbol
export const fetchDataForSymbol = (symbol:string) => async (dispatch: Dispatch) => {
  try {
    console.log("fetching symbols",symbol)
    dispatch(getTradingDataStart());
    const response = await API.getTradingDataforSymbol(symbol);
    dispatch(getTradingDataSuccess(response.data));
  } catch (err: any) {
    
    dispatch(getTradingDataFail(err.response.data));
  }
};


