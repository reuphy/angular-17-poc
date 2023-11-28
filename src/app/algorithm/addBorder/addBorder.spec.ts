import { addBorder } from './addBorder';

describe(addBorder.name, () => {

    it('should add **** in at the begining of array and', () => {
        const stars = '*****';
        const data = ['abc', 'ded'];
        data.unshift(stars);  // [ '*****', 'abc', 'ded' ] 
        
        expect(data[0]).toBe(stars);
    });

     it('should add **** in at the end of array', () => {
        const stars = '*****';
        const data = ['abc', 'ded'];
        data.push(stars);  // [ 'abc', 'ded', '*****' ] 
        
        expect(data[2]).toBe(stars);
     })


     it('should add **** in at the begining of array and the end', () => {
        const stars = '*****';
        const data = ['abc', 'ded'];
        data.unshift(stars);  // [ '*****', 'abc', 'ded' ] 
        data.push(stars);  // [ '*****', 'abc', 'ded', '*****' ] 
        
        expect(data[0]).toBe(stars);
        expect(data[3]).toBe(stars);
    })

    it('should add * at the begining of array and the end', () => {
        const stars = '*****';
        const data = ['abc', 'ded'];
        data.unshift(stars);  // [ '*****', 'abc', 'ded' ] 
        data.push(stars);  // [ '*****', 'abc', 'ded', '*****' ] 
        
        expect(data).toEqual( [ '*****', 'abc', 'ded', '*****' ] );
    })

    xit('should convert array to string', () => {
       let str = [ '*****', 'abc', 'ded', '*****' ].join('\n');
         expect(str).toBe('*****\nabc\nded\n*****');
    })


 
});


        // // arrange
        // const data = ['abc, ded'];

        // // act
        // const response = addBorder(data);

        // // assert
        // expect(response).toEqual([
        //     "*****",
        //     "*abc*",
        //     "*ded*",
        //     "*****"
        // ]);