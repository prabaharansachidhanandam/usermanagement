import { NextResponse } from 'next/server';
import sms from '../../../services/sms';
import utils from '../../../services/utils';
import {login} from '../../../db/auth/login';
import { cookies } from 'next/headers';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  userid: string;
  mobile:string
}


export async function POST(req: Request, res: Response) {
  try {
    const data  = await req.json();
    const encrypted = data.data;
    const json = utils.decrypt(encrypted);    
    //console.log('json -' + json);
    const response:User[] = await login.authenticate(json.email);
    if(response.length > 0) {

      cookies().set('session', `${response[0].userid}`, {
        httpOnly: true,
        //secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 1, // One week
        path: '/',
      });

      var otpResponse = await sms.sendOTP(response[0].mobile);
      return NextResponse.json({message: 'ok'});
    } else {
      return NextResponse.json({message: 'failed'});
    }
    
    /*if(json.email == 'prabaharan@bigger-brains.com') {      
      var otpResponse = await sms.sendOTP('+919841546832');
      return NextResponse.json({message: 'ok'});      
    }*/
    //return NextResponse.json({message: 'ok'});      
  } catch (error) {
    
  }
}