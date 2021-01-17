require("dotenv").config();

//let Person;
//1
let uri =
  "mongodb+srv://freecodecamp:" +
  process.env.PW +
  "@freecodecamp.pzib3.mongodb.net/db1?retryWrites=true&w=majority";
let mongoose = require("mongoose");
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//2
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);
//3
var createAndSavePerson = function(done) {
  var Austinchou = new Person({
    name: "Austin",
    age: 20,
    favoriteFoods: ["tea", "pizza"]
  });
  Austinchou.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};
//
//const createAndSavePerson = done => {
//done(null /*, data*/);
//;
//4
var arrayOfPeople = [
  { name: "Timson", age: 21, favoriteFoods: ["Taco"] },
  { name: "Joesph", age: 20, favoriteFoods: ["chicken"] },
  { name: "Law", age: 21, favoriteFoods: ["beef"] }
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};
//5
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};
//const findPeopleByName = (personName, done) => {
//done(null /*, data*/);
//};
//6
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};
//const findOneByFood = (food, done) => {
//done(null /*, data*/);
//};
//7
const findPersonById = function(personId, done) {
  Person.findById(personId, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};
//const findPersonById = (personId, done) => {
//done(null /*, data*/);
//};
//8
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};
//9
const findAndUpdate = (personName, done) => {
  const age = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: age },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.log(err);
      done(null, updatedDoc);
    }
  );
};
//10
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};
//11
const removeManyPeople = done => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  });
};
//12
const queryChain = done => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => (err ? done(err) : done(null, data)));
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
