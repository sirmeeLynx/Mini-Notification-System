import { Queue } from 'bull';

interface IHttpStatus{
    status: number;
}

type RequestHandler = ((uri: string, payload:any) => Promise<IHttpStatus>);

interface IMessageQueue {
    publish(recipient: string, message: Record<string, any>, fnCallBack: () => void): void;
}

 export class MessageQueue implements IMessageQueue {

  private readonly queue: Queue;
  private readonly handler: RequestHandler;
  
  constructor(queue: Queue, handler: RequestHandler){
     this.queue = queue;
     this.handler = handler;
     this.processQueue();
     this.retryFailedJobs();
  }

  private async retryFailedJobs(): Promise<void>{
    const failedJobs = await this.queue.getFailed();
    for(const job of failedJobs){
      //job.remove();
      job.retry();
    }
  }

  private serializeMethod(fn: (a:string,b:any) => void): string {
     const strFn = fn.toString();
     return Buffer.from(strFn).toString('base64');
  }

  private deSerializeMethod(strFn: string): (a:string,b:any) => void {
    const strDecoded = Buffer.from(strFn, 'base64').toString();
    const fn = eval(`(${strDecoded.trim()})`) as (()=> void);

    return fn;
 }

  publish(recipient: string, message: Record<string, any>, fnCallBack: (a:string,b:any) => void): void {
    const context = this;
    context.queue.add({
      recipient,
      message,
      fnCallBack: context.serializeMethod(fnCallBack)
    });
  }

  private async processQueue(): Promise<void> {
    const context = this;
    context.queue.process(async function(job){
        const {recipient, message} = job.data;
        const fnCallBack = context.deSerializeMethod(job.data.fnCallBack);
        //console.log("deserialized function => ", fnCallBack);
        const response = await context.handler(recipient, message); //makes http request to subscriber
        
        //console.log("processing job => ", response);
        
        //fnCallBack && fnCallBack(recipient, message); //store sent messages
        return true;
    });
  }
  
}