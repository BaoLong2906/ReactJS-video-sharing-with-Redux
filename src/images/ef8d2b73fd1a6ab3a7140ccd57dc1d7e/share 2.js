const { compare } = require('bcrypt-nodejs');

module.exports = function (app, isLoggedIn, Grid, conn, mongoose, Grid,group) {

    var nodemailer = require('nodemailer');
    const request = require('request-promise');
    let gfs;
    let gfsx;
    conn.once('open', () => {
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
    });
    conn.once('open', () => {
        gfsx = Grid(conn.db, mongoose.mongo);
        gfsx.collection('fs');
    });
    app.get('/files', (req, res) => {
        gfsx.files.find().toArray((err, files) => {
            // Check if files
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: 'No files exist'
                });
            }

            // Files exist
            return res.json(files);
        });
    });

    // @route GET /files/:filename
    // @desc  Display single file object
    app.get('/files/:filename', (req, res) => {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            // Check if file
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: 'No file exists'
                });
            }
            // File exists

            if (file.contentType === 'application/pdf' || file.contentType === 'image/jpeg' || file.contentType === 'application/msword' || file.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.contentType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                // Read output to browser
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            } else {
                return res.json(file);
            }

        });
    });

    // @route GET /image/:filename
    // @desc Display Image
    app.get('/image/:filename', (req, res) => {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            // Check if file
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: 'No file exists'
                });
            }

            // Check if image
            if (file.contentType === 'application/pdf' || file.contentType === 'application/msword' || file.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.contentType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                // Read output to browser
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            } else {
                res.status(404).json({
                    err: 'Not an image'
                });
            }
        });
    });
///////////////////////////// TOOL ????ng b??i Facebook///////////////////////////// 
    app.get("/get-group", isLoggedIn, function (req, res) {
        if (req.user.facebook.id) {
            var id = req.user.facebook.id;
            var token = req.user.facebook.token
            var limit = 600;
            targetfields = ["picture", "name", "id"]
            const options = {
                method: 'GET',
                uri: `https://graph.facebook.com/v11.0/${id}/groups`, // url API 
                qs: {
                    access_token: `${token}`, // Token account
                    limit: `${limit}`,        //  gi??? h???n hi???n th???
                    fields: `${targetfields}` // Quy???n
                }
            };
            request(options)
                .then(fbRes => {
                    var a = JSON.parse(fbRes) // chuy???n ?????i data sang d???ng json
                    const dataFB = a.data
                    if(req.user.local.Type =="Office"){
                            res.render('facebook-ListGroup.ejs', { // render json to views
                                user: req.user,
                                dataFB: dataFB,
                            })}})}
    })
    app.post("/post-group", function (req, res) {
        const arr = req.body.selectmultiple
        const group = [] // Truy???n id group mu???n ????ng 
        arr.forEach(function(item){group.push({"id":item}) }) // push id v?? m???ng 
        const maxacminh = Math.floor(Math.random() * 101) // radom k?? t??? k?? t??? ????ng b??i
        const webdriver = require('selenium-webdriver')
        const {Builder, By, Key, until} = require('selenium-webdriver')
        const chrome = require('selenium-webdriver/chrome')
        const chromedriver = require('chromedriver') 
        const config = {"email":req.body.taikhoan,"pass": req.body.matkhau, // t??i kho???n + m???t kh???u facebook , b???n n??o d??ng cookie th?? set cookie , d??ng acces_token c??ng ???????c , ri??ng m??nh th?? d??ng t??i kho???n + m???t kh???u
        "post":req.body.noidungpost+"......."+maxacminh, "delay": 10000,
        "groups": group}
        const login_mbasic ='https://mbasic.facebook.com/login';
        const link_groups = 'https://mbasic.facebook.com/groups/';
        chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());// T???o m???i tab goole
        const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
        (async function main() { 
            try {
                await visit(login_mbasic);
                const emailInput = await findByName('email'); 
                const passInput = await findByName('pass');	
                const loginButton = await findByName('login');
                await write(emailInput,config.email);
                await write(passInput,config.pass);
                await loginButton.click();
                await driver.wait(until.titleIs('Facebook'), 100000);
                for (let i = 0; i < config.groups.length; i++) {
                    let group = config.groups[i];
                    await visit(link_groups+group.id);
                    const messageInput = await findByName('xc_message');
                    const postButton = await findByName('view_post');
                    await write(messageInput,config.post);
                    await postButton.click();
                    await driver.sleep(config.delay);
                };
            } finally {
                quit();// ????ng tab
            }
        })();
        async function visit(url) {
            return await driver.get(url);
        };
        async function quit() {
        return await driver.quit();
        };
        async function findByName(name) {
        await driver.wait(until.elementLocated(By.name(name)), 25000, 'kh??ng x??c ?????nh ch??? th???'); // th???i gian t??m ki???m ,
        return await driver.findElement(By.name(name));
        };
        async function write(el, text) {
        return await el.sendKeys(text);
        };
        res.redirect("/get-group") // chu??????n h?????ng 
    })
};

