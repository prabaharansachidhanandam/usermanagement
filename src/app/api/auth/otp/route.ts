import { NextResponse } from 'next/server';
import utils from '../../../services/utils';
import sms from '../../../services/sms';
import {user} from '../../../db/users/users';
import { cookies } from 'next/headers';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  userid: string;
  mobile:string
}

export async function POST(req: Request, res: Response) {
  const data  = await req.json();
  const encrypted = data.data;

  const sessiondata = cookies().get('session')?.value as string;
  const response:User[] = await user.getById(sessiondata);
  //console.log('sessiondata -- ' + sessiondata);
  const json = utils.decrypt(encrypted); 
  //console.log('response -- ' + response[0]);
  if(response.length > 0) {
    var otpResponse = await sms.validateOTP(json.otp, response[0].mobile);
    //return NextResponse.json({message: 'ok'});
    console.log(otpResponse);
    if(otpResponse == 'approved') {
      return NextResponse.json({message: 'ok'});
    } else {
      return NextResponse.json({message: 'error'});
    }
    //return NextResponse.json({message: 'ok'});
  }
  //console.log(json.otp);
  
  
}
