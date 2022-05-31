import { createStore } from 'redux';
import rootReducer from './reducers';
import rootCGVReducer from './reducers/CGVreducers'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2, // Xem thêm tại mục "Quá trình merge".
  whiteList: ['seatReducer', 'phimReducer'],
};
const pReducer = persistReducer(persistConfig, rootReducer);
//let store = createStore(rootReducer);

let store = createStore(rootCGVReducer);
export default store; 

//vku_student@vku-ns-hadoop.duckdns.org:2222

// export let store = createStore(pReducer);
// export const persistor = persistStore(store);

//python RatingsBreakdown.py -r hadoop --hadoop-streaming-jar /usr/hdp/current/hadoop-mapreduce-client/hadoop-streming.jar huynhcaobaolong18it151/u.data
//hdfs dfs -copyFromLocal u.data huynhcaobaolong18it151