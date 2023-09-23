const router = require("express").Router();
const Pdf = require("../models/pdfModel");
const fs = require('fs');
const PDFParser = require('pdf-parse');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'greenearth1019@gmail.com',
        pass: 'playbig1019!)!('
    }
});

function getBookingRef(text) {
    const tmp1 = text.split(" BOOKING REF: ");
    const bookingRef = tmp1[1].substring(0, 6);

    return bookingRef;
}

function getNames(text) {
    const flights = text.split('FLIGHT     ');
    const topContent = flights[0];
    const tmp = [], namesTmp = [], names = [];
    topContent.split('/').map((tc, ind) => {
        if (ind == 0) {
            tmp.push(tc.split('  ')[tc.split('  ').length - 1]);
        } else {
            tmp.push(tc.split('  ')[0], tc.split('  ')[tc.split('  ').length - 1]);
        }
    });
    for (var i = 0; i < tmp.length; i += 2) {
        if (tmp[i + 1])
            namesTmp.push(tmp[i] + '/' + tmp[i + 1]);
    }
    namesTmp.map(n => {
        names.push(n.split('\n')[0]);
    });

    return names;
}

function makeTicketAsBold(text) {
    const flightsLen = text.split('FLIGHT     ').length - 1;
    const flightArr = text.split('FLIGHT     ');
    const flights = [], lines = [];
    for (var i = 1; i <= flightsLen; i++) {
        if (i == flightsLen) {
            flights.push('FLIGHT     ' + flightArr[i].split('FLIGHT(S) CALCULATED')[0]);
        } else {
            flights.push('FLIGHT     ' + flightArr[i]);
        }
    }

    flights.map(f => {
        const tmp = f.split(/\r?\n/);
        if (tmp[1].includes('ARRIVAL:')) {
            lines.push(tmp[0]);
            lines.push(tmp[1]);
            lines.push(tmp[2]);
            lines.push(tmp[3]);
        } else {
            lines.push(tmp[0]);
            lines.push(tmp[1]);
            lines.push(tmp[2]);
            lines.push(tmp[3]);
            lines.push(tmp[4]);
        }
    })

    lines.map(line => {
        var re = new RegExp(`(${line.replace(/[()]/g, '\\$&')})`, 'g');
        text = text.replace(re, '<strong>$1</strong>');
    });

    text = text.replace('FLIGHT     ', '\nFLIGHT     ')
    text = text.replace('FLIGHT(S) CALCULATED', '\nFLIGHT(S) CALCULATED')
    return text;
}

function makeTicketsAsBold(text) {
    var res = text;
    const lines = [];
    res.split('FLIGHT TICKET(S)')[1].split(/\r?\n/).map(ticket => {
        if (ticket != '' && !ticket.includes('---')) {
            lines.push(ticket)
        }
    });

    lines.map(line => {
        res = res.replaceAll(line, '<strong>' + line + '</strong>');
    });

    return res;
}

router.post("/parse", async (req, res) => {
    try {
        const pdfPath = './public/' + req.body.fileId;

        fs.readFile(pdfPath, (err, data) => {
            if (err) throw err;

            PDFParser(data).then(async (pdf) => {
                const pdfText = pdf.text;

                var text = '', html = '';

                text = pdfText.replace('\n\n', '');
                text = text.split('GENERAL INFORMATION')[0];

                var bookingRef = getBookingRef(text);

                // booking ref as bold
                var re = new RegExp(`(${bookingRef}|MAYA TRAVEL)`, 'g');
                text = text.replace(re, '<strong>$1</strong>');
                // remove wrong bold
                text = text.replaceAll('/<strong>' + bookingRef + '</strong>', '/' + bookingRef);

                // extract names and make them as bold
                const names = getNames(pdfText);
                names.map(n => {
                    var re = new RegExp(`(${n.replace(/[()]/g, '\\$&')})`, 'g');
                    text = text.replace(re, '<strong>$1</strong>');
                });

                // remove wrong bold
                names.map(na => {
                    text = text.replaceAll('FOR <strong>' + na + '</strong>', 'FOR ' + na);
                    text = text.replaceAll('FOR<strong>' + na + '</strong>', 'FOR' + na);
                    text = text.replaceAll('FOR<strong> ' + na + '</strong>', 'FOR' + na);
                })

                // ticket line as bold
                text = makeTicketAsBold(text);

                text = makeTicketsAsBold(text);

                text = text.replace(/ /g, '&nbsp;');
                html += '<p style="white-space: pre-wrap; font-family: Consolas, monospace;">' + text + '</p>';

                const newPdf = new Pdf({
                    bookRef: bookingRef,
                    content: html
                });
                const savedPdf = await newPdf.save();

                res.send({
                    savedPdf: savedPdf
                })
            });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/read", async (req, res) => {
    try {
        const pdf = await Pdf.findOne({ _id: req.body.id });
        if (pdf)
            return res
                .status(200)
                .json(pdf);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/readAll", async (req, res) => {
    try {
        const pdf = await Pdf.find({  });
        if (pdf)
            return res
                .status(200)
                .json(pdf);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/sendEmail", async (req, res) => {
    try {
        const pdf = await Pdf.findOne({ _id: req.body.id });
        if (pdf) {
            var mailOptions = {
                from: 'office@mayatravel.ro',
                to: req.body.email,
                subject: 'Sending Email From Maya Travel - ' + pdf.bookRef,
                text: pdf.content
            };

            transporter.sendMail(mailOptions, function (error, info) {
                console.log("Node Mailer:::", error, info)
                if (error) {
                    return res
                        .status(500)
                        .json({ error: error });
                } else {
                    return res
                        .status(200)
                        .json({});
                }
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
