import { absoluteValuesSumMinimization, isEven } from './absoluteValuesSumMinization';

describe(absoluteValuesSumMinimization.name, () => {
    it('should check if value is even or odd', () => {
        // arrange
        const odd = 3
        const even = 2
        // act
        const responseIsodd = isEven(odd);
        const responseIseven = isEven(even);
        // assert
        expect(responseIsodd).toBe(false);
        expect(responseIseven).toBe(true);
    });

    it('should floor a value', () => {
        // arrange
        const value = 3.9
        // act
        const response = Math.floor(value);
        // assert
        expect(response).toBe(3);
    });

    it('should get the median value of an odd array length', () => {

        const array = [2, 4, 6, 8, 10, 12, 15]

        const length = array.length // 7

        const response = array[Math.floor(length / 2)]  // 7 / 2 = 3.5 = 3

        expect(response).toBe(8)
    })

    it('should get the median value of an even array length', () => {

        const array = [2, 4, 6, 8, 10, 12]

        const length = array.length // 6

        const response = array[Math.floor(length / 2) - 1]  // 7 / 2 = 3.5 = 3 - 1 = 2

        expect(response).toBe(6)
    })

    it('should test absoluteValuesSumMinimization', () => {
        expect(absoluteValuesSumMinimization([2, 4, 7])).toBe(4)
        expect(absoluteValuesSumMinimization([2, 4, 7, 6])).toBe(4)
        expect(absoluteValuesSumMinimization([2, 4, 7, 6, 6])).toBe(7)
        expect(absoluteValuesSumMinimization([2, 4, 7, 6, 6, 8])).toBe(7)
    })

});
