import { Client } from '@line/bot-sdk';
import { constants } from 'http2';
const CHANNEL_ACCESS_TOKEN: string = 'wfm7vK/krtxzy9yRiSjCZTQd9pUftzPYXn+czuEiWK/Rh1e3TMrGO+dtR/It4JWq/wVREAgJ6wkhAxnNR6ZUQCMVGs21Nj7joNh7PAbUryAT72V56N/La40WZEZyUoowohep3nL8UQihTZQKNuNVtwdB04t89/1O/w1cDnyilFU=';
const CHANNEL_SECRET: string = '8719d45424d3df95182307d020956d00';
const MANAGE_LINE_ID:string ='Ua3f36939af62f16d188eef2c79c8c0e7';
const client = new Client({
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
});
export const linePushMessage =async (message:string)=>{
    return client.pushMessage(MANAGE_LINE_ID,{text:'text',text:message});
}