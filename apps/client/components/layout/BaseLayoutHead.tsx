import NextHead from 'next/head';

export interface BaseLayoutHeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const BaseLayoutHead: React.FC<BaseLayoutHeadProps> = (props) => {
  return (
    <NextHead>
      {/* Base */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      {props.children}
    </NextHead>
  );
};

export default BaseLayoutHead;
