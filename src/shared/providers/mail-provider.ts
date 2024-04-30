import { ENVS } from '@config/envs';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { MailDataRequired, MailService } from '@sendgrid/mail';

interface EmailData {
  to: string;
  subject: string;
  templateId?: string;
  dynamicTemplateData?: Record<string, unknown>;
  html?: string;
  from?: string;
  customArgs?: Record<string, unknown>;
}

@Injectable()
export class MailProvider {
  private readonly apiKey: string = ENVS.SENDGRID.API_KEY;
  private readonly mailService: MailService;
  private readonly logger = new Logger(MailProvider.name);

  constructor() {
    this.mailService = new MailService();
    this.mailService.setApiKey(this.apiKey);
  }

  async sendEmail(data: EmailData): Promise<void> {
    const {
      to,
      subject,
      templateId,
      dynamicTemplateData,
      html,
      from,
      customArgs,
    } = data;

    if (!to || !subject || (!templateId && !html)) {
      throw new BadRequestException('Missing required fields');
    }

    const mailData: Partial<MailDataRequired> = {
      to,
      from: from || ENVS.SENDGRID.FROM_EMAIL,
      subject,
      customArgs,
    };
    console.log(mailData);

    if (templateId) {
      mailData.templateId = templateId;
      mailData.dynamicTemplateData = dynamicTemplateData;
    } else {
      mailData.html = html;
    }

    try {
      await this.mailService.send(mailData as MailDataRequired);
      this.logger.log(`Email sent to ${to}`);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error sending email');
    }
  }
}
