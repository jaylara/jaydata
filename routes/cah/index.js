
const axios = require('axios');
const obj = require('./cards')
//
//?type=&&decks=CAHe1&decks=CAHe2
function getCards(req, res) {
    // axios.post(`http://www.crhallberg.com/cah/output.php`,{
    //     "type": 'JSON',
    //     "decks" : ['Base']
    // })
    // //axios.get('https://raw.githubusercontent.com/crhallberg/json-against-humanity/master/dev/cah.json')
    // .then((res) => {
    //     res.send(res);
    // }) // end of axios.get.then
    // .catch((error)=>{
    //
    //     res.send(error);
    // }) // end of axios.get.catch
    res.json(obj);

}//end of search()

module.exports = {
    getCards
};
