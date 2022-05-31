import { combineReducers } from 'redux';
import phimReducer from './PhimReducer';
import seatReducer from './SeatReducer';
import qlPhimReducer from './QLPhimReducer';

let rootReducer = combineReducers({
    phimReducer: phimReducer,
    seatReducer: seatReducer,
    qlPhimReducer: qlPhimReducer,
});

export default rootReducer;