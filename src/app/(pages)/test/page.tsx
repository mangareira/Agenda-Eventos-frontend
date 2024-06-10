'use client'
import React, { useState } from 'react'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

/*Estilos*/
import './style.css'
import './style-certificate.css'


/*Animação de tela enquanto o e-mail é enviado*/

/*Importando lista de participantes*/

function ListOfPresents(props) {

		/*Recebe o evento selecionado pelo organizador*
    	
    	/*Função destinada ao envio de e-mail, recebe o e-mail do participante*/
		const sendEmail = (to) =>{	

			/*Este e-mail enviará os certificados*/
			let from = ""

			const input = document.getElementsByClassName('certificate-background')[0];
			window.scrollTo(0,0);
			html2canvas(input, {
					windowWidth: input.scrollWidth,
					windowHeight: input.scrollHeight
				})
				.then((canvas) => {
					const imgData = canvas.toDataURL('image/png');
					const pdf = new jsPDF('l', 'mm', 'a4', true);

					pdf.addImage(imgData, 'PNG', 3, 3, 380, 265, '', 'SLOW');
					var formData = new FormData();
					formData.append('file', new Blob([pdf.output('blob')], {type: 'application/pdf'}), "certificado.pdf");
					formData.append('from', from);
					formData.append('to', to);

					fetch('http://localhost:8080/send-mail', {
						method: 'POST',
						body: formData,
					})
					.then(success =>  message.success("Email enviado com sucesso!"))
					.catch(error => message.error("Não foi possível enviar seu email!")
					);
				});

		}

		return (
			<>
				<div style={{ display: visible ?  'none' : 'grid' }}>				
					<div className="certificate-background">
						<img src='./logo_texto_preto.png' alt="Logo da empresa" className="img-logo-certificate"/>
						<img src='/stars.png' alt="5 estrelas" className="img-stars"/> 
						<p className="p-certificate">A comunidade <span className="info-certificate">{evento?.company}</span> confere ao participante <span className="info-certificate">{thisParticipante?.name}</span> o presente certificado 
							<br/>referente a sua participação no evento? <span className="info-certificate">{evento?.course}</span> realizado do 
							<br/>dia <span className="info-certificate">{evento?.startDate}</span> ao <span className="info-certificate">{evento?.finishDate}</span>, com carga horaria de <span className="info-certificate">{evento?.workload} horas.</span>
							<br/>
						</p>
						<img alt="Assinatura Digital" src={evento?.digitalSignature} className="digitalSignature" />
						<hr/>
						<p className="p-2-certificate">{evento?.user}</p>
					</div>
				</div>
			</>
		);
}

export default ListOfPresents;
