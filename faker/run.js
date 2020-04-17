const {
    mongooseConf
} = require('./mongooseConf');
const {company} = require('./company')
const {feed} = require('./feed')
const {house} = require('./house')

// mongooseConf( () => {
//     for (let i = 0; i < 10; i++) {
//         company('5e60896bc122370d80d9a785', (res) => {
//             console.log(res);
//         }, (err) => {
//             console.log(err);
//         });
//     }
// });

mongooseConf( () => {
    for (let i = 0; i < 100; i++) {
        house('5e60896bc122370d80d9a785', (res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }
});