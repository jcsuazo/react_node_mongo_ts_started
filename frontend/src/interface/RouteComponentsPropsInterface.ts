import { RouteComponentProps } from 'react-router-dom';
export default interface ChildComponentProps extends RouteComponentProps<any> {
  params: {
    id?: string;
  };
}
