/* Imports
========================================================= */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Panel, PanelBody, Button, Spinner } from '@wordpress/components';
import { useState, useRef, useCallback } from '@wordpress/element';
import { Configuration, OpenAIApi } from 'openai';
import FormInput from './FormInput';
import './editor.scss';

/* Function
========================================================= */

export default function Edit() {

	/* OpenAI Init */

	const configuration = new Configuration({
		organization: "", // optional
		apiKey: YOUR_API_KEY,
	});
	delete configuration.baseOptions.headers['User-Agent']; // suppress User Agent error for localhost
	const openai = new OpenAIApi(configuration);


	/* Form State */

	const [newQuestion, setNewQuestion] = useState("");
	const [newAnswer, setNewAnswer] = useState("");
	const [isCopied, setisCopied] = useState(false);

	/* Refs */

	const textRef = useRef();

	/* Loading */

	const [isLoading, setIsLoading] = useState(false);

	/* Copy to Clipboard */

	const copyToClipboard = () => {
		const generatedText = textRef.current;
		if (generatedText) {
			if (navigator.clipboard) {
				navigator.clipboard.writeText(generatedText)
					.then(() => {
						alert('Copied to clipboard!');
						setisCopied(true);
					})
					.catch((error) => {
						console.error('Failed to copy text: ', error);
						setisCopied(false);
					});
			}
		}
	};

	/* Generate ChatGPT Response */

	const generateResponse = useCallback(async (newQuestion) => {

		setisCopied(false);
		setIsLoading(true);

		await openai.createCompletion(
			{
				model: "text-davinci-003",
				prompt: newQuestion,
				temperature: 0.7,
				max_tokens: 500
			}
		)
			.then((response) => {
				console.log(response.data);
				setNewAnswer(response.data.choices[0].text);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			})
	}, [openai]);

	/* Render */

	return (

		<div {...useBlockProps()}>
			<div className="gpt-block-wrap">
				{isLoading ?
					<>
						<small className="loading-header">Thinking...</small>
						<Spinner />
					</>
					:
					<>
						{newAnswer.length >= 1 ?
							<div className="generated-text-container">
								<h3>Your Result:</h3>
								<div className="generated-gpt-copy" ref={textRef} style={{ marginBottom: "15px" }}>
									{newAnswer}
								</div>
								<Button
									variant="secondary"
									icon="admin-page"
									onClick={copyToClipboard}>
									{isCopied ? 'Copied!' : 'Copy Text'}
								</Button>
							</div>
							:
							<div>
								<small>ChatGPT Block:</small>
								<h6>Awaiting your question...</h6>
							</div>
						}
					</>
				}

				<InspectorControls>
					<PanelBody title={__('Ask a Question', 'gpt-block')}>
						<Panel>
							<FormInput
								newQuestion={newQuestion}
								setNewQuestion={setNewQuestion}
								generateResponse={generateResponse} />
						</Panel>
					</PanelBody>
				</InspectorControls>

			</div>
		</div>

	);
}
