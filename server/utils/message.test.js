const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Jen';
        const text = 'Some message';
        //assert from and text match
        const message = generateMessage(from, text);
        //assert createAt is number 

        expect(typeof message.createdAt).toEqual('number');
        expect(message).toMatchObject({
            from,
            text
        });


    });
});