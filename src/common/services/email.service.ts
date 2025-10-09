import { Injectable, Logger } from '@nestjs/common';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // In a real application, you would integrate with an email service like:
      // - SendGrid
      // - AWS SES
      // - Mailgun
      // - Nodemailer with SMTP
      
      // For now, we'll simulate sending an email by logging it
      this.logger.log('=== EMAIL SENT ===');
      this.logger.log(`To: ${options.to}`);
      this.logger.log(`Subject: ${options.subject}`);
      this.logger.log(`Content: ${options.text || options.html}`);
      this.logger.log('==================');

      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 100));

      return true;
    } catch (error) {
      this.logger.error('Failed to send email:', error);
      return false;
    }
  }

  async sendPasswordResetEmail(email: string, resetCode: string, userName: string): Promise<boolean> {
    const subject = 'Código de Recuperação de Senha - Boi na Nuvem';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Recuperação de Senha</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2c5530; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .code { 
            background-color: #2c5530; 
            color: white; 
            padding: 20px; 
            text-align: center; 
            font-size: 32px; 
            font-weight: bold; 
            letter-spacing: 8px; 
            border-radius: 10px; 
            margin: 20px 0;
            font-family: 'Courier New', monospace;
          }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .instructions { background-color: #e7f3ff; border: 1px solid #b3d9ff; padding: 15px; border-radius: 5px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🐄 Boi na Nuvem</h1>
            <h2>Recuperação de Senha</h2>
          </div>
          <div class="content">
            <p>Olá, <strong>${userName}</strong>!</p>
            <p>Recebemos uma solicitação para redefinir a senha da sua conta no Boi na Nuvem.</p>
            
            <div class="instructions">
              <h3>📱 Seu código de verificação:</h3>
              <div class="code">${resetCode}</div>
              <p><strong>Digite este código no aplicativo para continuar com a redefinição da sua senha.</strong></p>
            </div>
            
            <div class="warning">
              <strong>⚠️ Importante:</strong>
              <ul>
                <li>Este código é válido por apenas <strong>15 minutos</strong></li>
                <li>Se você não solicitou esta redefinição, ignore este email</li>
                <li>Não compartilhe este código com outras pessoas</li>
                <li>O código é de uso único e expira após o uso</li>
              </ul>
            </div>
            
            <p>Se você não conseguir usar o código, solicite um novo código de recuperação.</p>
          </div>
          <div class="footer">
            <p>Este é um email automático, não responda a esta mensagem.</p>
            <p>© 2024 Boi na Nuvem. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Código de Recuperação de Senha - Boi na Nuvem
      
      Olá, ${userName}!
      
      Recebemos uma solicitação para redefinir a senha da sua conta no Boi na Nuvem.
      
      Seu código de verificação é: ${resetCode}
      
      Digite este código no aplicativo para continuar com a redefinição da sua senha.
      
      IMPORTANTE:
      - Este código é válido por apenas 15 minutos
      - Se você não solicitou esta redefinição, ignore este email
      - Não compartilhe este código com outras pessoas
      - O código é de uso único e expira após o uso
      
      Se você não conseguir usar o código, solicite um novo código de recuperação.
      
      Este é um email automático, não responda a esta mensagem.
      
      © 2024 Boi na Nuvem. Todos os direitos reservados.
    `;

    return this.sendEmail({
      to: email,
      subject,
      html,
      text
    });
  }

  async sendPasswordResetConfirmationEmail(email: string, userName: string): Promise<boolean> {
    const subject = 'Senha Alterada com Sucesso - Boi na Nuvem';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Senha Alterada</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #28a745; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .success { background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🐄 Boi na Nuvem</h1>
            <h2>Senha Alterada com Sucesso</h2>
          </div>
          <div class="content">
            <p>Olá, <strong>${userName}</strong>!</p>
            <div class="success">
              <strong>✅ Sucesso!</strong> Sua senha foi alterada com sucesso.
            </div>
            <p>Sua conta está segura e você pode fazer login normalmente com sua nova senha.</p>
            <p>Se você não fez esta alteração, entre em contato conosco imediatamente.</p>
          </div>
          <div class="footer">
            <p>Este é um email automático, não responda a esta mensagem.</p>
            <p>© 2024 Boi na Nuvem. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Senha Alterada com Sucesso - Boi na Nuvem
      
      Olá, ${userName}!
      
      ✅ Sucesso! Sua senha foi alterada com sucesso.
      
      Sua conta está segura e você pode fazer login normalmente com sua nova senha.
      
      Se você não fez esta alteração, entre em contato conosco imediatamente.
      
      Este é um email automático, não responda a esta mensagem.
      
      © 2024 Boi na Nuvem. Todos os direitos reservados.
    `;

    return this.sendEmail({
      to: email,
      subject,
      html,
      text
    });
  }
}
