import {useReducer, useCallback} from 'react';

import {imageDetect} from '@/api/endpoints/imageDetectApi';

import {ErrorType} from '@/types/error';
import {DetectionResultType} from '@/types/detection';

interface DetectionState {
  isLoading: boolean;
  status: ErrorType | null;
  fetchResult: DetectionResultType[] | null;
}

type Action =
  | {type: 'FETCH_START'}
  | {type: 'FETCH_SUCCESS'; payload: DetectionResultType[]}
  | {type: 'FETCH_EMPTY'}
  | {type: 'FETCH_FAIL'};

function detectionReducer(
  state: DetectionState,
  action: Action,
): DetectionState {
  switch (action.type) {
    case 'FETCH_START':
      return {...state, isLoading: true};

    case 'FETCH_SUCCESS':
      return {
        isLoading: false,
        status: 'success',
        fetchResult: action.payload,
      };

    case 'FETCH_EMPTY':
      return {
        isLoading: false,
        status: 'empty',
        fetchResult: null,
      };

    case 'FETCH_FAIL':
      return {
        isLoading: false,
        status: 'failed',
        fetchResult: null,
      };

    default:
      return state;
  }
}

export function useDetection() {
  const [detectionState, dispatch] = useReducer(detectionReducer, {
    isLoading: true,
    status: null,
    fetchResult: null,
  });

  const getData = useCallback(async (sourceUri: string) => {
    dispatch({type: 'FETCH_START'});

    try {
      const responseData = await imageDetect(sourceUri);

      console.log('Result: ', responseData);

      if (responseData.success && responseData.data.length > 0) {
        dispatch({type: 'FETCH_SUCCESS', payload: responseData.data});
      } else if (responseData.success && responseData.data.length === 0) {
        dispatch({type: 'FETCH_EMPTY'});
      }
    } catch (error) {
      console.error(error);

      dispatch({type: 'FETCH_FAIL'});
    }
  }, []);

  return {detectionState, getData};
}
