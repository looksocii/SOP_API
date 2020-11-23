
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: true }));

var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sop-backup.firebaseio.com"
});
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })

var tests = [
    {
        id: 1,
        name: "test",
        content: "helloo"
    }
];

app.get('/api/order', (req, res) => {
    (async () => {
        try {
            let query = db.collection('Order');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    order_id: doc.data().order_id,
                    product_id: doc.data().product_id,
                    user_id: doc.data().user_id
                };
                response.push(selectedItem);
            }
            });
            console.log(response);
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});


// -------------------- เช็คความพร้อมใช้งานได้ที่นี้ --------------------

// Chat Service และ Question Service
app.get('/api/store', (req, res) => { 
    (async () => {
        try {
            let query = db.collection('Store');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    store_id: doc.data().store_id,
                    store_name: doc.data().store_name
                };
                response.push(selectedItem);
            }
            });
            console.log(response);
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// Review Service
app.get('/api/product', (req, res) => {
    (async () => {
        try {
            let query = db.collection('Product');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    product_id: doc.data().product_id,
                    price: doc.data().price,
                    product_name: doc.data().product_name,
                    store_id: doc.data().store_id
                };
                response.push(selectedItem);
            }
            });
            console.log(response);
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// Service ทั้งหมด
app.get('/api/username', (req, res) => {
    (async () => {
        try {
            let query = db.collection('User');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    user_id: doc.data().user_id,
                    username: doc.data().username
                };
                response.push(selectedItem);
            }
            });
            console.log(response);
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});
// -------------------------------------------------------------

// Post & get Review

app.get('/api/review', (req, res) => {
    (async () => {
        try {
            let query = db.collection('Review');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    review_id: doc.data().review_id,
                    rank: doc.data().rank,
                    content: doc.data().content,
                    photo: doc.data().photo,
                    product_id: doc.data().product_id,
                    user_id: doc.data().user_id
                };
                response.push(selectedItem);
            }
            });
            console.log(response);
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});



app.post('/api/createreview', (req, res) => {
    let num = Math.random()
    let iddoc = (num*1000).toFixed(0);
    let five = Math.floor(Math.random() * 5) + 1;
    (async () => {
        try {
          await db.collection('Review').doc('/' + iddoc +'/')
              .create({
                  review_id: iddoc,
                  content: req.body.content,
                  photo: "",
                  product_id: req.body.product_id,
                  rank: five,
                  user_id: req.body.user_id
                });
            console.log(req.body);
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
        
      })
      ();
});


// Post get & delete  Question
app.get('/api/question', (req, res) => {
    (async () => {
        try {
            let query = db.collection('Question');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    question_id: doc.data().question_id,
                    content: doc.data().content,
                    product_id: doc.data().product_id,
                    user_id: doc.data().user_id
                };
                response.push(selectedItem);
            }
            });
            console.log(response);
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});


app.post('/api/createquestion', (req, res) => {
    let num = Math.random()
    let iddoc = (num*1000).toFixed(0);
    (async () => {
        try {
          await db.collection('Question').doc('/' + iddoc +'/')
              .create({
                  question_id: iddoc,
                  content: req.body.content,
                  product_id: req.body.product_id,
                  user_id: req.body.user_id
                });
            console.log(req.body);
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
        
      })
      ();
});

app.delete('/api/deletequestion/:item_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('Question').doc(req.params.item_id);
            await document.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });


// Post get & delete  Comments

app.get('/api/comment', (req, res) => {
    (async () => {
        try {
            let query = db.collection('Comment');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    comment_id: doc.data().comment_id,
                    content: doc.data().content,
                    question_id: doc.data().question_id,
                    store_id: doc.data().store_id,
                    product_id: doc.data().product_id
                };
                response.push(selectedItem);
            }
            });
            console.log(response);
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

app.post('/api/createcomment', (req, res) => {
    let num = Math.random()
    let iddoc = (num*1000).toFixed(0);
    (async () => {
        try {
          await db.collection('Comment').doc('/' + iddoc +'/')
              .create({
                  content: req.body.content,
                  comment_id: req.body.comment_id,
                  question_id: req.body.question_id,
                  store_id: req.body.store_id,
                  product_id: req.body.product_id
                });
            console.log(req.body);
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
        
      })
      ();
});

app.delete('/api/deletecomment/:item_id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('Comment').doc(req.params.item_id);
            await document.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });


// Post & get connections

app.get('/api/connection/user/', (req, res) => {
    (async () => {
        try {
            let query = db.collection('Connection');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    connection_id: doc.data().connection_id,
                    store_id: doc.data().store_id,
                    user_id: doc.data().user_id
                };
                response.push(selectedItem);
            }
            });
            console.log(response);
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

app.get('/api/connection/store/', (req, res) => {
    (async () => {
        try {
            let query = db.collection('Connection');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    connection_id: doc.data().connection_id,
                    store_id: doc.data().store_id,
                    user_id: doc.data().user_id
                };
                response.push(selectedItem);
            }
            });
            console.log(response);
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

app.post('/api/createconnection', (req, res) => {
    let num = Math.random()
    let iddoc = (num*1000).toFixed(0);
    (async () => {
        try {
          await db.collection('Connection').doc('/' + iddoc +'/')
              .create({
                  connection_id: iddoc,
                  store_id: req.body.store_id,
                  user_id: req.body.user_id
                });
            console.log(req.body);
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
        
      })
      ();
});


// Post & get Messages

app.get('/api/message', (req, res) => {
    (async () => {
        try {
            let query = db.collection('Message');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    message_id: doc.data().message_id,
                    connection_id: doc.data().connection_id,
                    from_id: doc.data().from_id,
                    date_time: doc.data().date_time,
                    content: doc.data().content
                };
                response.push(selectedItem);
            }
            });
            console.log(response);
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

app.post('/api/createmessage', (req, res) => {
    let num = Math.random()
    let iddoc = (num*1000).toFixed(0);
    // Use of Date.now() method 
    const d = new Date().toLocaleString();
    // const a = new Date(d); 
    // const datetime = a.getDate() + "-" + (a.getMonth() + 1) + "-" + a.getFullYear()
    (async () => {
        try {
          await db.collection('Message').doc('/' + iddoc +'/')
              .create({
                message_id: iddoc,
                connection_id: req.body.connection_id,
                from_id: req.body.from_id,
                date_time: d,
                content: req.body.content
                });
            console.log(req.body);
          return res.status(200).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
        
      })
      ();
});
// app.post('/api/create', (req, res) => {
//    const test = {
//        id: tests.length + 1,
//        name: req.body.name,
//        content: req.body.content
//    }
//    tests.push(test);
//    res.send(test);
//   });

exports.app = functions.https.onRequest(app);