import { insertIntervals, } from './insert-intervals'

describe('Insert intervals', () => {
    it('should return intervals after the insertion', () => {
         const intervals = [[1, 3], [6, 9]]
         const newIntervals = [2, 5]
         

         expect(insertIntervals(intervals, newIntervals)).toEqual([[1, 5], [6, 9]])
    })

     it('should return intervals after the insertion', () => {
         const intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]]
         const newIntervals = [4,8]
         

         expect(insertIntervals(intervals, newIntervals)).toEqual([[1,2],[3,10],[12,16]])
    })

})