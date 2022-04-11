import * as React from 'react';
import { Stack, Form, Button, Alert, Card } from 'react-bootstrap';
import { Url } from '../models/url.model';

interface ICreateUrlsProps {
    urls: Url[];
    setUrl: (value: React.SetStateAction<Url[]>) => void
    createUrl: (url: Url) => Promise<any>; 
}

const CreateUrls: React.FunctionComponent<ICreateUrlsProps> = ({ urls, setUrl, createUrl }) => {
    const [error, setError] = React.useState<string>("");
    const urlRef = React.useRef<HTMLInputElement | null>(null);
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (urlRef.current?.value === '')
        {
            return setError("Please enter Url to shorten.");
        }

        createUrl({
            base_Url: "http://localhost:3000",
            url: (urlRef.current as HTMLInputElement).value,
            date: (new Date()).toString()
        }).then((value) => { 
            if (value.is_Url_Invalid) {
                return setError("The Url is invalid. Run Url in the browser to make sure it is valid.");
            }
            else { 
                setError("");
                
                // only insert if url does not exist
                const index = urls.findIndex(url => url.id === value.id);
                if (index < 0) {
                    setUrl([...urls, value]);
                }
                else
                {
                    return setError("Url already exists: ".concat(value.url_And_Slug)); 
                }
            }
        }).catch((error) => {
            setError(error); 
            }
        );

        (urlRef.current as HTMLInputElement).value = "";
    }
    return (
        <>
            <Stack gap={2} className="col-md-8 mx-auto text-center">
                <Card>
                    <Card.Body>
                        <h2>Create Short Url</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}   
                        <Form onSubmit={ (e) => handleSubmit(e) }>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter Url to shorten" ref={urlRef} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Stack>
        </>
  )
};

export default CreateUrls;
