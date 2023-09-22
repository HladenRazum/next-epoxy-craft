type PhoheNumberLinkProps = {
   number?: string;
   text?: string;
};

export default function PhoneNumberLink({ number = '0888 888888', text = 'телефон' }: PhoheNumberLinkProps) {
   return <p>{text}: <a href={`tel:${number}`}>{number}</a></p>;
}