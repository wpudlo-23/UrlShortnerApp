import * as React from 'react';
import { Url } from '../models/url.model';
import { Alert } from 'react-bootstrap';

interface IUrlsProps {
    urls: Url
}

const Urls: React.FC<IUrlsProps> = ({urls}) => {
    return (
        <>
            <Alert key={urls.id} variant='info'>
                <h5>{urls.url_And_Slug}</h5>
                {urls.url}
            </Alert>
        </>
    );
};

export default Urls;
