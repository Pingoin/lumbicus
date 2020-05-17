import { ipcRenderer } from 'electron';
import * as $ from "jquery";

$(document).ready(function () {
    console.log("page ready");
    $('#sendSettings').click(() => {
        let SSID: string = String($('#ssid').val());
        let pass: string = String($('#pass').val());
        let host: string = String($('#host').val());
        let ipStr: string = String($('#ip').val());
        let subnetStr: string = String($('#subnet').val());
        let gwStr: string = String($('#gateway').val());
        let brokerStr: string = String($('#broker').val());
        let settings = {
            SSID: SSID,
            pw: pass,
            host: host,
            ip: getIpFromStr(ipStr),
            subnet: getIpFromStr(subnetStr),
            gw: getIpFromStr(gwStr),
            broker: getIpFromStr(brokerStr)
        };

        ipcRenderer.send('setSettings', JSON.stringify(settings))
    });
});

ipcRenderer.on('settingsReply', (event, args) => {
    console.log(JSON.parse(args));
    $('#reply').html( args);
});


function getIpFromStr(ipString: string): Boolean | Number[] {
    let arr: Number[] = [];
    let isIP: Boolean = true;
    let subStr: String[] = ipString.split('.');
    isIP = (subStr.length == 4);
    subStr.forEach(element => {
        let number: Number = Number(element);
        if (number == NaN) {
            isIP = false;
        }
        if (number >= 0 && number <= 255) {
            arr.push(number)
        } else {
            isIP = false;
        }
    });
    if (isIP) {
        return arr;
    } else {
        return false;
    }

}