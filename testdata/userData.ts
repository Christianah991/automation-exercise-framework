export const userData = {
    existingUser: {
      email: 'test401@hotmail.com',
      password: 'Test123'
    },
  
    newUser: () => {
      const id = Date.now();
  
      return {
        name: 'Test User',
        email: `test${id}@email.com`,
        password: 'Test123',
        day: '10',
        month: 'May',
        year: '1995',
        firstName: 'Test',
        lastName: 'User',
        address: 'Test Address',
        country: 'Canada',
        state: 'Ontario',
        city: 'Milton',
        zipcode: 'L97 1AA',
        mobile: '07123456789'
      };
    }
  };