db.friends.aggregate([
    { $unwind: '$examScores' }
]).pretty()

db.friends.aggregate([
    { $unwind: '$examScores' },
    { $sort: { examScores: -1 } }
]).pretty()

db.friends.aggregate([
    { $unwind: '$examScores' },
    { $sort: { 'examScores.score': -1 } }
]).pretty()

// can do same thing by projection
// group by id
db.friends.aggregate([
    { $unwind: '$examScores' },
    { $project: { _id: 1, name: 1, age: 1, score: '$examScores.score' } },
    { $sort: { score: -1 } },
    { $group: { _id: '$_id', maxScore: { $max: '$score' } } }
]).pretty()

db.friends.aggregate([
    { $unwind: '$examScores' },
    { $project: { _id: 1, name: 1, age: 1, score: '$examScores.score' } },
    { $group: { _id: '$_id', maxScore: { $max: '$score' } } }
]).pretty()

db.friends.aggregate([
    { $unwind: '$examScores' },
    { $project: { _id: 1, name: 1, age: 1, score: '$examScores.score' } },
    { $group: { _id: '$_id', name: { $first: '$name' }, maxScore: { $max: '$score' } } },
    { $sort: { maxScore: -1 } }
]).pretty()

db.friends.aggregate([
    { $unwind: '$examScores' },
    { $project: { _id: 1, name: 1, age: 1, score: '$examScores.score' } },
    { $group: { _id: '$_id', name: { $first: '$name' }, age: { $first: '$age' }, maxScore: { $max: '$score' } } },
    { $sort: { maxScore: -1 } }
]).pretty()