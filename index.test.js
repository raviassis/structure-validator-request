const validator = require('./index');

describe('Validate', () => {
    let next;
    const attributes = {
        name: {
            type: String,
            required: true
        }
    };
    beforeEach(() => {
        next = jest.fn();
    });

    it('is valid', () => {
        const req = {body: {name: "name"}};
        const res = {status: jest.fn()};
        validator.validate(attributes)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    it('is not valid', () => {
        const req = {body: {}};
        const json = jest.fn();
        const res = {status: jest.fn().mockReturnValue({json})};
        validator.validate(attributes)(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(422);
    });
});