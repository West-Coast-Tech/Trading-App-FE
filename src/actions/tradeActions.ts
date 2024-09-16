import { Dispatch } from 'redux';
import {
  getTradesStart,
  getTradesSuccess,
  getTradesFail,
  addTradeStart,
  addTradeSuccess,
  addTradeFail,
  updateTradeStart,
  updateTradeSuccess,
  updateTradeFail,
  deleteTradeStart,
  deleteTradeSuccess,
  deleteTradeFail,
} from '../features/trades/tradeSlice'; // Import actions from your trade slice
import API from '../utils/API'; // Import API client
import { TradesData } from './types';

// Action to fetch trades
export const fetchTrades = () => async (dispatch: Dispatch) => {
  try {
    dispatch(getTradesStart());
    const token = sessionStorage.getItem('token') || '';
    const userId = sessionStorage.getItem('id') || '';
    console.log("userId",userId)

    const response = await API.getTrades(token,userId); // API call to get trades
    console.log("responsetrades",response)
    dispatch(getTradesSuccess(response.data));
  } catch (err: any) {
    dispatch(getTradesFail(err.response?.data || 'Failed to fetch trades'));
  }
};

// Action to add a new trade
export const addTrade = (tradeData: TradesData) => async (dispatch: Dispatch) => {
  try {
    dispatch(addTradeStart());
    const token = sessionStorage.getItem('token') || '';
    const userId = sessionStorage.getItem('id') || '';
    console.log("userId",userId)
    const response = await API.addTrade(tradeData, userId); // API call to create a trade
    dispatch(addTradeSuccess(response.data));
  } catch (err: any) {
    dispatch(addTradeFail(err.response?.data || 'Failed to add trade'));
  }
};

// Action to update a trade when it is completed
export const updateTrade = (tradeId: string, updatedTrade: Partial<TradesData>) => async (dispatch: Dispatch) => {
  try {
    dispatch(updateTradeStart());
    const token = sessionStorage.getItem('token') || '';
    const response = await API.updateTrade(tradeId, updatedTrade, token); // API call to update a trade
    dispatch(updateTradeSuccess(response.data));
  } catch (err: any) {
    dispatch(updateTradeFail(err.response?.data || 'Failed to update trade'));
  }
};

// Action to delete a trade (optional)
export const deleteTrade = (tradeId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(deleteTradeStart());
    const token = sessionStorage.getItem('token') || '';
    await API.deleteTrade(tradeId, token); // API call to delete a trade
    dispatch(deleteTradeSuccess(tradeId));
  } catch (err: any) {
    dispatch(deleteTradeFail(err.response?.data || 'Failed to delete trade'));
  }
};
