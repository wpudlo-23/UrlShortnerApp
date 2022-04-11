import React, { useState, useEffect } from 'react';
import { useParams, } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';

interface ISlugRedirectProps {
    getUrlBySlug: (slug:string) => Promise<any>
}

const SlugRedirect: React.FunctionComponent<ISlugRedirectProps> = ({getUrlBySlug}) => {
    const { slug }: { slug: string } = useParams();
    const [showMsg, setShowMsg] = useState(false); 

    useEffect(() => {
        getUrlBySlug(slug).then((value) => { 
            if (value.url) {
                window.location.href = value.url;
            }
            else { 
                setShowMsg(true);
            }
        }).catch((error) => {
            setShowMsg(true); 
            }
        );
      }, [getUrlBySlug, slug]);
    
    return (
        <>
            {showMsg ?
                <div>
                    <Alert variant='danger'>Invalid Url</Alert>
                    <br />
                    <Button href="/">Home</Button>
                </div>
                :
                <div>Redirecting ...</div>
            }
        </>
    );
};

export default SlugRedirect;
