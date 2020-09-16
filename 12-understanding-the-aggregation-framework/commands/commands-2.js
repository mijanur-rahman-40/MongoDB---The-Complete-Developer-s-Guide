db.friends.aggregate([
    { $group: { _id: { age: '$age' }, allHobbies: { $push: '$hobbies' } } }
]).pretty()

db.friends.aggregate([
    { $unwind: '$hobbies' }
]).pretty()

db.friends.aggregate([
    { $unwind: '$hobbies' },
    { $group: { _id: { age: '$age' }, allHobbies: { $push: '$hobbies' } } }
]).pretty()

db.friends.aggregate([
    { $unwind: '$hobbies' }, { $group: { _id: { age: '$age' }, allHobbies: { $addToSet: '$hobbies' } } }
]).pretty()