import * as mqttD from 'mqtt/dist/mqtt.esm'
import { validateInput } from './validateInput';
import { VID, password } from '../stores/loginCreds';
import { ab2str } from './crypto/keyOps';
import { loggedIn } from '../stores/loggedIn';
import { lastPing } from '../stores/lastPing';


let lvid = '';
let lpassword = '';

VID.subscribe(v => {
    lvid = v;
})


password.subscribe(x => {
    lpassword = x;
})

const mqtt = mqttD.default;
function startConnection() {
    const options = {
        username: 'rlinky',
        password: 'Rinoancvv__$5252_'
    };
    const client = mqtt.default.connect(
        'wss://0a9f6c7b687745f5b2d3b8025842c1ba.s1.eu.hivemq.cloud:8884/mqtt',
        options
    );
    client.on('connect', () => {
        console.log('connected');
    });

    client.on('message', (topic, message) => {
        try {
            const parsedMessage = JSON.parse(message.toString());
            const msgType = parsedMessage.type;
            const msgPayload = parsedMessage.payload;
            switch (msgType) {
                case 'loginRes':
                    localStorage.setItem('auth', JSON.stringify({ V: lvid, P: lpassword }));
                    loggedIn.set(true);
                    break;
                case 'heartbeat':
                    lastPing.set(Date.now());
                default:
                    break;
            }
        } catch (e) {

        }
    });

    return client;
}


function emit(RTC, key, value) {
    const input = { RTC: RTC, key: key, value: value };
    if (validateInput(['RTC', 'key', 'value'], input) === false) {
        return { status: 'failed', error: 'One or more args is undefined' };
    } else {
        try {
            RTC.publish(key, JSON.stringify(value));
            return { success: true, status: 'success' };
        } catch (e) {
            return { status: 'failed', error: e };
        }
    }
}

export { startConnection, emit }