import { Subjects, Publisher, ExpirationCompleteEvent } from "@sgticket-common/common";

export default class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject:Subjects.ExpirationComplete = Subjects.ExpirationComplete;
    
}