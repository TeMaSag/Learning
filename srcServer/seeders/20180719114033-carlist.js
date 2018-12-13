'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('carlists', [{
      name: 'Audi A6',
      year: '2010',
      price: 8000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'BMW X5',
      year: '2011',
      price: 9000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mercedes-Benz',
      year: '2015',
      price: 15000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mazda 6',
      year: '2013',
      price: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mitsubishi Lancer',
      year: '2018',
      price: 16000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Ford Focus',
      year: '2014',
      price: 12000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Skoda',
      year: '2013',
      price: 14000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Subaru',
      year: '2016',
      price: 15600,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Opel',
      year: '2010',
      price: 5000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Honda Accord',
      year: '2017',
      price: 11000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Honda Civic',
      year: '2015',
      price: 16300,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Indiniti',
      year: '2016',
      price: 25000,
      createdAt: new Date(),
      updatedAt: new Date()
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('carlist', null, {});
  }
};
