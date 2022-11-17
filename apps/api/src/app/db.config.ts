import mongoose = require('mongoose');

const dbConfig = {
  uri:
    process.env.MONGODB_URI ||
    'mongodb://localhost:27017/skill-assessment-portonics',
};

export const dbConnect = () => {
  mongoose.connect(dbConfig.uri);
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
  });
};
