import * as React from 'react';
import { Url } from '../models/url.model';
import Urls from './Urls';
import { Button } from 'react-bootstrap';

interface IUrlsListProps {
    urls: Url[],
    setUrl: (value: React.SetStateAction<Url[]>) => void
    deleteAll: () => Promise<any>; 
}

const UrlsList: React.FC<IUrlsListProps> = ({ urls, setUrl, deleteAll }) => {
    const handleDelete = () => {
        deleteAll().then((value) => {
            setUrl([]);
        }).catch((error) => {
            
        });
    }
  
    const renderUrls = () : JSX.Element[] => {
        return urls.map(url => {
            return <Urls key={ url.id } urls={ url } />    
        })
    }
    return (
        <>
            <h4>Urls</h4>
            <Button variant="danger" size='sm' onClick={ handleDelete }>Clear Urls</Button>
            <hr />
            { renderUrls() }
        </>
    );
};

export default UrlsList;
