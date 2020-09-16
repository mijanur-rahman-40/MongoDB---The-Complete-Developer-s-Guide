conn = new Mongo();
db = conn.getDB("credit");

for (let i = 0; i < 1000000; i++) {
    db.ratings.insertOne({
        "person_id": i + 1,
        "score": Math.random() * 100,
        "age": Math.floor(Math.random() * 70) + 18 
    })
}