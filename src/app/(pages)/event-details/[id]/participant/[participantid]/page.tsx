export default async function PaymentPage({params}: {params: {participantid: string}}) {
    return (
        <div className="">
            <p>{params.participantid}</p>
        </div>
    )
}