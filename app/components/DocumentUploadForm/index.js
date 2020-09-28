/**
 *
 * DocumentUploadForm
 *
 */

import React from 'react';

import {
  	Tag,
  	Row,
  	Col,
  	Spin,
  	Form,
  	Input,
  	Select,
  	Upload,
  	Button,
  	Tooltip,
  	Checkbox,
  	DatePicker,
  	message,
} from 'antd';

import {
	PlusOutlined,
	UploadOutlined,
  	FileImageOutlined,
  	LoadingOutlined,
  	DropboxOutlined
} from '@ant-design/icons';

import moment from 'moment';
import { exist } from '../../utils/functions';

import './index.css';

const dateFormat = 'DD/MM/YYYY';
const dateYear = moment().format('YYYY');
const documentFormat = 'FISICO';

const DocumentUploadForm = props =>  {

	const formRef = React.createRef();
	const fileDataRef = React.useRef(null);
	const [documentType, setDocumentType] = React.useState([]);
	const [sender, setSender] = React.useState('');
	const [numberDocument, setNumberDocument] = React.useState('');
	const [registerDate, setRegisterDate] = React.useState([]);
	const [closingDate, setClosingDate] = React.useState([]);
	const [area, setArea] = React.useState([]);
	const [code, setCode] = React.useState('');
	const [subtotal, setSubtotal] = React.useState('');
	const [tax, setTax] = React.useState('');
	const [user, setUser] = React.useState([]);
	const [total, setTotal] = React.useState('');
	const [fileList, setFileList] = React.useState([]);
	const [fileData, setFileData] = React.useState([]);
	const [documentOrigin, setDocumentOrigin] = React.useState(1);
	const [confidential, setConfidential] = React.useState(false);

	const [inputVisible, setInputVisible] = React.useState(false);
	const [tags, setTags] = React.useState([]);
	const [inputValue, setInputValue] = React.useState('');
	const [editInputIndex, setEditInputIndex] = React.useState(-1);
	const [editInputValue, setEditInputValue] = React.useState('');

	const [loadingUpload, setLoadingUpload] = React.useState(false);

	const handleRegister = () => {

		const formData = new FormData();

		formData.append('sender', sender);
		formData.append('documentType', documentType);
		formData.append('numberDocument', numberDocument);
		formData.append('registerDate', registerDate);
		formData.append('area', area);
		formData.append('code', code);
		formData.append('subtotal', subtotal);
		formData.append('tax', tax);
		formData.append('user', user);
		formData.append('total', total);

		if (fileData.length > 0) {
	  		formData.append('file', fileData[0]);
	  	};

	  	const dataArea = props.areas.filter(areaItem => areaItem.id_area == area);
		const dataUser = props.users.filter(userItem => userItem.id == user);

		const data = {
			file: formData,
			data: {
				code,
				area: dataArea[0].name,
				user: `${dataUser[0].name} ${dataUser[0].lastname}`,
			}
		};

		props.onSubmit(data);

	};

	const onChangeFilelist = ({ file }) => {
		setLoadingUpload(true);
		setFileData([]);

		let state_file = true;
		const isTypeFile = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
	  	if (!isTypeFile) {
	    	message.error('¡Este tipo de archivos no estan permitidos!');
	    	state_file = false;
	  	}

	  	const isLt2M = file.size / 1024 / 1024 < 20;
	  	if (!isLt2M) {
	    	message.error('¡La imagen debe tener un tamaño inferior a 20MB!');
	    	state_file = false;
	  	}

	  	setLoadingUpload(false);
	  	if (state_file) {
			setFileData([ file ]);
	  	}

	  	// return isTypeFile && isLt2M;
  		return state_file;
	};

	const handleChangeSubtotal = ({ target }) => {
		const subtotal = target.value;
		setSubtotal(subtotal);

		if (subtotal >= 0 || subtotal != '') {

			const total = Math.round((subtotal * 1.18) * 100) / 100;
			const tax = Math.round((total - subtotal) * 100) / 100;
			setTax(tax);
			setTotal(total);

			formRef.current.setFieldsValue({
		      tax,
		      total,
		    });

		}

	};

	const handleChangeOrigin = origin => {
		setDocumentOrigin(origin);

		const { areas, documentTypes } = props;

		const areaDocument = areas.filter(areaItem => areaItem.id_area == area);

		if (areaDocument.length > 0) {

			const codeArea = areaDocument[0].code;

			const codeDocumentType = documentTypes.filter(type => type.id_document_type == documentType);

			if (codeDocumentType.length > 0) {

				const codeType = codeDocumentType[0].code;

				const dataAutoCode = {
					documentOrigin,
					codeArea,
					codeType,
				};

				setCodeDocument(dataAutoCode);

			}

		}
	};

	const handleChangeDocumentType = (typeDoc) => {
		setDocumentType(typeDoc);

		const { areas, documentTypes } = props;

		const areaDocument = areas.filter(areaItem => areaItem.id_area == area);

		if (areaDocument.length > 0) {

			const codeArea = areaDocument[0].code;

			const codeDocumentType = documentTypes.filter(type => type.id_document_type == documentType);

			if (codeDocumentType.length > 0) {

				const codeType = codeDocumentType[0].code;

				const dataAutoCode = {
					documentOrigin,
					codeArea,
					codeType,
				};

				setCodeDocument(dataAutoCode);

			}

		}

	};

	const setCodeDocument = ({ codeArea, codeType}) => {

		if (documentOrigin == 2) {

			const generatedCode = [codeType, dateYear, documentFormat, '01'];

			setCode(generatedCode.join('-'));

			formRef.current.setFieldsValue({
			    code: generatedCode.join('-'),
			});

		} else {

			const generatedCode = [codeType, `${codeArea}/ADMIN`, dateYear, '01'];

			setCode(generatedCode.join('-'));

			formRef.current.setFieldsValue({
			    code: generatedCode.join('-'),
			});

		}

	};

	const handleChangeArea = area => {

		setArea(area);

		const { areas, documentTypes } = props;

		const areaDocument = areas.filter(areaItem => areaItem.id_area == area);

		if (areaDocument.length > 0) {

			const codeArea = areaDocument[0].code;

			const codeDocumentType = documentTypes.filter(type => type.id_document_type == documentType);

			if (codeDocumentType.length > 0) {

				const codeType = codeDocumentType[0].code;

				const dataAutoCode = {
					documentOrigin,
					codeArea,
					codeType,
				};

				setCodeDocument(dataAutoCode);

			}

		}

	};

	React.useEffect(() => {

		if (props.barcode) {

			const barcodeNumber = exist(props.barcode.code) ? `${props.barcode.code}` : '';
			const barcodeType = exist(props.barcode.id_document_type) ? props.barcode.id_document_type : '';

			setCode(barcodeNumber);
			setDocumentType(barcodeType);

			formRef.current.setFieldsValue({
		      code: barcodeNumber,
		      documentType: barcodeType,
		    });

		} else {

			formRef.current.setFieldsValue({
			    documentOrigin,
			});

		}

	}, [props.barcode]);

	React.useEffect(() => {
		//console.log(props.fields);
	}, [props.fields]);

	const handleInputConfirm = () => {

		if (inputValue && tags.indexOf(inputValue) === -1) {
	    	const tagsTmp = [...tags, inputValue];
	    	setTags(tagsTmp);
	    }

	    setInputVisible(false);
		setInputValue('');

	};

	const handleClose = removedTag => {
	    const tagsTmp = tags.filter(tagItem => tagItem !== removedTag);
	    setTags(tagsTmp);
	};

	const handleEditInputConfirm = () => {
		const newTags = [...tags];
		newTags[editInputIndex] = editInputValue;

		setTags(newTags);
		setEditInputIndex(-1);
		setEditInputValue(editInputValue);

	};

	const renderFields = () => {
		const { fields } = props;

		const fieldSet = fields.filter(typeDoc => typeDoc.id_document_type == documentType);

		if (fieldSet.length > 0) {

			return fieldSet.map((field, index) => {
				if (field.id_field_type == 4) {
					return (
						<Form.Item
							key={index}
							name={`field[${index}]`}
							label={field.name}
							rules={[{ required: true, message: 'Ingresar ' + field.name }]}>
							<Input.TextArea
								name={`field[${index}]`}
							/>
						</Form.Item>
					)
				}
				if (field.id_field_type == 3) {
					return (
						<Form.Item
							key={index}
							name={`field[${index}]`}
							label={field.name}
							rules={[{ required: true, message: 'Ingresar ' + field.name }]}>
							<Select
								name={`field[${index}]`}
							>
								{
									field.options.map((option, indexOption) => {
										return (
											<Select.Option value={option.id_document_type_field_item} key={indexOption}>{option.value}</Select.Option>
										)
									})
								}
							</Select>
						</Form.Item>
					)
				}
				return (
					<Form.Item
						key={index}
						name={`field[${index}]`}
						label={field.name}
						rules={[{ required: true, message: 'Ingresar ' + field.name }]}>
						<Input
							name={`field[${index}]`}
						/>
					</Form.Item>
				)
			});

		}

		return null;

	};

	const handleSearchSender = (value) => {
		props.onSearchSender(value);
	};

	const handleClick = () => {
		// fileDataRef.current.change()
	}

  	return (
	    <div>
	    	<Form
	    		ref={formRef}
		        layout={'vertical'}
		        onFinish={handleRegister}>
		        <Row>
		          	<Col span={6}>
			            <div style={{ paddingLeft: 15, paddingRight: 15 }}>

			              	<Form.Item
				                name="documentOrigin"
				                rules={[{ required: true, message: 'Seleccione una procedencia' }]}
				                label="Procedencia">
				                <Select
				                	value={documentOrigin}
				                	loading={false}
				                	onChange={handleChangeOrigin}
				                	name="documentOrigin">
				                  	<Select.Option key={'1'} value={1}>{'Interna'}</Select.Option>
				                  	<Select.Option key={'2'} value={2}>{'Externa'}</Select.Option>
				                </Select>
			              	</Form.Item>

			              	<Form.Item
				                name="documentType"
				                rules={[{ required: true, message: 'Seleccione un tipo de documento' }]}
				                label="Tipo de documento">
				                <Select
				                	value={documentType}
				                	loading={props.loadingDocumentTypes}
				                	onChange={handleChangeDocumentType}
				                	name="documentType">
				                  	{
					                    props.documentTypes.map((item, index) => {
					                      return <Select.Option key={index} value={item.id_document_type}>{item.name}</Select.Option>
					                    })
				                  	}
				                </Select>
			              	</Form.Item>

				            <Form.Item
				                rules={[{ required: true, message: 'Ingrese un remitente' }]}
				                name="sender"
				                label="Remitente">
				                <Input.Search
				                	placeholder="Remitente"
				                	name="sender"
				                	value={sender}
				                	onChange={({target}) => setSender(target.value)}
				                	onSearch={value => handleSearchSender(value)}
				                	enterButton />
				            </Form.Item>

							<Form.Item
								name="number_document"
								label="Numeración del documento"
								rules={[{ required: true, message: 'Ingrese una numeración' }]}
							>
								<Input name="number_document" value={numberDocument} onChange={({target}) => setNumberDocument(target.value)}/>
							</Form.Item>

							<Row gutter={[16, 16]}>
								<Col span={12}>
									<Form.Item
										name="register_date"
										label="Fecha de registro"
										rules={[{ required: true, message: 'Seleccione una numeración' }]}
									>
										<DatePicker format={dateFormat} value={registerDate} onChange={registerDate => setRegisterDate(registerDate)} name="register_date" style={{ width: '100%' }}/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="closing_date"
										label="Fecha de cierre"
										rules={[{ required: true, message: 'Seleccione una numeración' }]}
									>
										<DatePicker format={dateFormat} value={closingDate} onChange={closingDate => setClosingDate(closingDate)} name="closing_date" style={{ width: '100%' }}/>
									</Form.Item>
								</Col>
							</Row>

							<Form.Item
								name="area"
								label="Área del usuario"
								rules={[{ required: true, message: 'Seleccione una área' }]}
							>
				                <Select
				                	loading={props.loadingAreas}
				                	name="area"
				                	value={area}
				                	onChange={handleChangeArea}>
				                  	{
					                    props.areas.map((item, index) => {
					                      return <Select.Option key={index} value={item.id_area}>{item.name}</Select.Option>
					                    })
				                  	}
				                </Select>
			              	</Form.Item>

			              	<Form.Item
			                	name="user"
			                	label="Usuario de destino"
			                	rules={[{ required: true, message: 'Seleccione un destino' }]}
			              	>
				                <Select
				                	onSearch={() => props.searchUser(user)}
		                            allowClear
		                            showSearch
		                            placeholder="Buscar usuario de destino"
		                            notFoundContent={props.isLoadingUsers ? <div align="center"><Spin size="small" /></div> : null}
		                            style={{ width: '100%' }}
		                            filterOption={false}
		                            value={user}
		                            onChange={(user) => setUser(user)}
				                	loading={props.isLoadingUsers}
				                	name="user">
				                	{
				                		props.users.map((item, index) => {
				                			return <Select.Option key={index} value={item.id}>{ `${item.name} ${item.lastname}` }</Select.Option>
				                		})
				                	}
				                </Select>
			              	</Form.Item>

			            </div>
		          	</Col>
		          	<Col span={6}>
		            	<div style={{ paddingLeft: 15, paddingRight: 15 }}>
							<div style={{ display: 'none' }}>
								<h4>Cargar documento</h4>
								<Form.Item>
									<Upload
										beforeUpload={file => {
									        return false;
									    }}
									    showUploadList={false}
										onChange={onChangeFilelist}
										multiple={false}>
								        <Button type="primary" icon={<UploadOutlined />}> Cargar archivo</Button>
								    </Upload>
								</Form.Item>
							</div>
							<Form.Item
								name="code"
								label="Código de documento"
								rules={[{ required: true, message: 'Ingresar código' }]}>
								<Input
									name="code"
									readOnly={true}
									value={code}
									onChange={ ({ target }) => setCode(target.value) }
								/>
							</Form.Item>
							<Form.Item
								name="confidential">
									<Checkbox checked={confidential} onChange={({ target }) => setConfidential(target.checked)}> Confidencial</Checkbox>
							</Form.Item>
							<h4>Campos específicos</h4>
							{ renderFields() }
							<div>
								<div style={{ marginBottom: 10 }}>
									<label className="ant-form-item-required">Etiquetas: </label>
								</div>
						        {
						        	tags.map((tagItem, index) => {

										if (editInputIndex === index) {
											return (
											  	<Input
												    //ref={this.saveEditInputRef}
												    key={tagItem}
												    size="small"
												    className="tag-input"
												    value={editInputValue}
												    onChange={({target}) => setEditInputValue(target.value)}
												    onBlur={handleEditInputConfirm}
												    onPressEnter={handleEditInputConfirm}
											  	/>
											);
										}

					          			const isLongTag = tagItem.length > 20;

										const tagElem = (
											<Tag
												className="edit-tag"
												key={tagItem}
												closable={true}
												onClose={() => handleClose(tagItem)}
											>
											  	<span
												    onDoubleClick={e => {
												      	setEditInputIndex(index);
												      	setEditInputValue(tagItem);
												        e.preventDefault();
												    }}
											  	>
											    {tagItem}
											  	</span>
											</Tag>
										);

								        return isLongTag ? (
								            <Tooltip title={tagItem} key={tagItem}>
								              {tagElem}
								            </Tooltip>
								        ) : (
								        	<Tooltip title={tagItem} key={tagItem}>
								            	{tagElem}
								            </Tooltip>
								        );
					        		})
								}
						    	{
							    	inputVisible && (
							          <Input
							            //ref={this.saveInputRef}
							            type="text"
							            size="small"
							            className="tag-input"
							            value={inputValue}
							            onChange={({target}) => setInputValue(target.value)}
							            onBlur={handleInputConfirm}
							            onPressEnter={handleInputConfirm}
							          />
							        )
						    	}
						        {!inputVisible && (
						          <Tag className="site-tag-plus" onClick={() => setInputVisible(true)}>
						            <PlusOutlined /> Nueva etiqueta
						          </Tag>
						        )}
					      	</div>
			            </div>
		          	</Col>
		          	<Col span={12}>
		          		<div style={{ display: 'none' }}>
			          		{
			          			fileData.length > 0 ? 
			          				{
							          'application/pdf': <embed src={URL.createObjectURL(fileData[0])} width="100%" height="450" />,
							          'image/jpeg': <img src={URL.createObjectURL(fileData[0])} width="100%" height="450" />,
							          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': <embed src={`https://docs.google.com/gview?url=${URL.createObjectURL(fileData[0])}&embedded=true`} width="100%" height="450" />,
							          default: <div style={{ 
			          					width: '100%',
			          					height: 450,
			          					border: 'solid 1px #d9d9d9',
									    borderRadius: '5px',
									    display: 'flex',
									    alignItems: 'center',
									    justifyContent: 'center',
									    fontSize: '40px'
			          				}}><FileImageOutlined /></div>
							        }[fileData[0].type]
		          				: 
		          					<div>
				          				<div style={{ 
				          					width: '100%',
				          					height: 450,
				          					border: 'solid 1px #d9d9d9',
										    borderRadius: '5px',
										    display: 'flex',
										    alignItems: 'center',
										    justifyContent: 'center',
										    fontSize: '40px'
				          				}}><FileImageOutlined /></div>
									</div>
			          		}
			          	</div>
			          	<h4>Cargar documento <UploadOutlined onClick={handleClick} style={{display: 'none'}} /></h4>
		          		<Form.Item>
						    <Upload
						        ref={fileDataRef}
						        beforeUpload={file => {
							        return false;
							    }}
						        showUploadList={false}
						        onChange={onChangeFilelist}
						        name="avatar"
						        listType="picture-card"
						        className="avatar-uploader"
						        multiple={false}
						      >
						        {
				          			fileData.length > 0 ? 
				          				{
								          'application/pdf': <embed src={URL.createObjectURL(fileData[0])} width="100%" height="450" />,
								          'image/jpeg': <img src={URL.createObjectURL(fileData[0])} />,
								          'image/png': <img src={URL.createObjectURL(fileData[0])} />,
								          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': <embed src={`https://docs.google.com/gview?url=${URL.createObjectURL(fileData[0])}&embedded=true`} width="100%" height="450" />,
								          default: <div style={{ 
				          					width: '100%',
				          					height: 450,
				          					border: 'solid 1px #d9d9d9',
										    borderRadius: '5px',
										    display: 'flex',
										    alignItems: 'center',
										    justifyContent: 'center',
										    fontSize: '40px'
				          				}}><FileImageOutlined /></div>
								        }[fileData[0].type]
			          				: 
			          					<div>
									        {loadingUpload ? <LoadingOutlined /> : <DropboxOutlined style={{ fontSize: '32px', color: '#08c' }} />}
									        <div style={{ marginTop: 8 }}>Click/arrastrar algún archivo</div>
								      	</div>
				          		}
						    </Upload>
						</Form.Item>
		          	</Col>
		        </Row>
		        <Row>
		          	<Col span={24} align="right">
		          		<br />
		            	<Button
		            		loading={props.loading}
		            		htmlType="submit"
		            		type="primary">
		            		Guardar
		            	</Button>
		          	</Col>
		        </Row>
		    </Form>
	    </div>
  	);
}

DocumentUploadForm.propTypes = {};

export default DocumentUploadForm;
