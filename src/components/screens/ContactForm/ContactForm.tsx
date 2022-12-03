import React, { FC, useState } from 'react'
import styles from './ContactForm.module.scss'
import Logo from '@/assets/images/logo.png'
import { ContactFormProps } from '@/components/screens/ContactForm/ContactForm.props'
import { Formik } from 'formik'
import { validationSchema } from '@/components/screens/ContactForm/schema'
import cn from 'classnames'
import { inputs } from '@/components/screens/ContactForm/data'
import Button from '@/components/ui/Button/Button'
import CustomSelectForm from '@/components/screens/ContactForm/CustomSelectForm/CustomSelectForm'
import {
	achievements,
	cities,
	consultantDepartment,
	educationProgram,
	formPayment,
	formStudy,
	institutions,
	institutionType,
	languages,
	regions,
	socialStatus
} from '@/components/screens/ContactForm/options'
import Htag from '@/components/Htag/Htag'
import ContactFormInput from '@/components/screens/ContactForm/ContactFormInput/ContactFormInput'
import axios from 'axios'
import { CONTACT_FORM_BASE_URL } from '@/configs/constants'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { Stack, TextField } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { Link, useNavigate } from 'react-router-dom'
import {  selectRegionFn } from '@/components/screens/ContactForm/SelectFunc'

const stylesSelect = {
	option: (provided: any) => ({
		...provided
	}),
	control: (provided: any) => ({
		...provided,
		minHeight: 41,
		border: '1px solid #e5e7eb',
		backgroundColor: '#fff'
	}),
	placeholder: (provided: any) => ({
		...provided,
		color: '#9ca3af'
	})
}

let options: any = {
	year: 'numeric',
	month: 'long',
	day: 'numeric'
}

const ContactForm: FC<ContactFormProps> = () => {
	const [selectRegion, setSelectRegion] = useState('')
	const [selectCity, setSelectCity] = useState('')
	const [selectInstitutionType, setSelectInstitutionType] = useState('')

	const navigate = useNavigate()

	const renderLabel = (name: string) => {
		switch (name) {
			case 'firstName':
				return 'Аты (Имя)*'
			case 'lastName':
				return 'Тегі (Фамилия)*'
			case 'patronymic':
				return 'Әкесінің аты (Отчество)*'
			case 'email':
				return 'Email*'
			case 'phone':
				return 'Телефон'
			default:
				return <></>
		}
	}

	const renderInputs = (
		values: any,
		handleChange: any,
		handleBlur: any,
		touched: any,
		errors: any
	) => {
		return inputs.map((input, idx) => {
			return (
				<div
					key={idx}
					className={cn(
						'w-full mb-4 relative',
						touched[input.name] && errors[input.name] && 'mb-8'
					)}
				>
					<p className={'w-full'}>
						<ContactFormInput
							className={styles.input}
							type={input.type}
							name={input.name}
							value={values[input.name]}
							placeholder={renderLabel(input.name)}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</p>
					{touched[input.name] && errors[input.name] && (
						<span className={styles.error}>{errors[input.name]}</span>
					)}
				</div>
			)
		})
	}

	const [value, setValue] = useState<Dayjs | null>(dayjs('2006-08-18'))

	const handleChangeDatePicker = (newValue: Dayjs | null) => {
		setValue(newValue)
	}

	return (
		<>
			<div className={styles.main}>
				<div className={styles.main__row}>
					<h1 className={styles.main__title}>
						Әлеуетті талапкердің жеке карточкасы/ Личная карточка потенциального
						абитуриента
					</h1>
					<p className={styles.main__text}>
						барлық деректерді жеке куәлік бойынша толтыру қажет / все данные
						заполнять по удостоверению личности*
					</p>
					<img className={styles.main__logo} src={Logo} alt="logo" />
				</div>
				<div className={styles.wrapper}>
					<div className={styles.ContactForm}>
						<div className={styles.body}>
							<Htag className={styles.title} tag={'h1'}>
								Регистрация
							</Htag>
							<Formik
								initialValues={{
									firstName: '',
									lastName: '',
									patronymic: '',
									email: '',
									phone: '',
									socialStatus: '',
									regions: '',
									cities: '',
									institutionType: '',
									institutions: '',
									formStudy: '',
									educationProgram: '',
									achievements: '',
									formPayment: '',
									languages: '',
									consultantDepartment: '',
									yourQuestion: '',
									birthday: ''
								}}
								onSubmit={async (values, { resetForm }) => {
									const data = {
										firstName:
											values.firstName.slice(0, 1).toUpperCase() +
											values.firstName.slice(1).toLowerCase(),
										lastName:
											values.lastName.slice(0, 1).toUpperCase() +
											values.lastName.slice(1).toLowerCase(),
										patronymic: values.patronymic.length
											? values.patronymic.slice(0, 1).toUpperCase() +
											  values.patronymic.slice(1).toLowerCase()
											: 'не указано',
										email: values.email.toLowerCase(),
										phone: values.phone,
										birthday: value,
										socialStatus: values.socialStatus
											? values.socialStatus
											: 'не выбрано',
										regions: values.regions ? values.regions : 'не выбрано',
										cities: values.cities ? values.cities : 'не выбрано',
										institutionType: values.institutionType
											? values.institutionType
											: 'не выбрано',
										institutions: values.institutions
											? values.institutions
											: 'не выбрано',
										formStudy: values.formStudy
											? values.formStudy
											: 'не выбрано',
										educationProgram: values.educationProgram
											? values.educationProgram
											: 'не выбрано',
										achievements: values.achievements
											? values.achievements
											: 'не выбрано',
										formPayment: values.formPayment
											? values.formPayment
											: 'не выбрано',
										languages: values.languages
											? values.languages
											: 'не выбрано',
										consultantDepartment: values.consultantDepartment
											? values.consultantDepartment
											: 'не выбрано',
										yourQuestion: values.yourQuestion
											? values.yourQuestion
											: 'нет вопросов',
										created_at: new Date().toLocaleString('ru', options)
									}
									try {
										await axios.post(`${CONTACT_FORM_BASE_URL}contacts.json`, [
											data
										])
										await navigate('/successful-form')
										await resetForm()
									} catch (e) {
										console.warn(e)
									}
								}}
								validationSchema={validationSchema}
							>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									isValid,
									handleSubmit,
									setFieldValue,
									dirty
								}) => (
									<form className={styles.form} onSubmit={handleSubmit}>
										{renderInputs(
											values,
											handleChange,
											handleBlur,
											touched,
											errors
										)}
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<Stack spacing={3} my={2.3}>
												<DesktopDatePicker
													label="Дата рождения"
													inputFormat="DD/MM/YYYY"
													value={value}
													onChange={handleChangeDatePicker}
													renderInput={(params) => (
														<TextField
															sx={{
																'& .MuiOutlinedInput-root': {
																	'& > fieldset': {
																		borderColor: '#e5e7eb'
																	}
																},
																input: {
																	fontFamily: 'Montserrat Alternates'
																},
																label: {
																	fontFamily: 'Montserrat Alternates',
																	backgroundColor: 'white',
																	fontSize: '16px',
																	color: '#374151'
																}
															}}
															{...params}
														/>
													)}
												/>
											</Stack>
										</LocalizationProvider>
										<CustomSelectForm
											styles={stylesSelect}
											className={cn('mb-4')}
											onChange={(value: { value: string; label: string }) =>
												setFieldValue('socialStatus', value.value)
											}
											options={socialStatus}
											value={values.socialStatus}
											placeholder={'Социальный статус'}
										/>
										<div
												 className={cn(
													 'w-full mb-4 relative',
													 touched.regions && errors.regions && 'mb-8'
												 )}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) => {
													setFieldValue('regions', value.value)
													setSelectRegion(value.value)
												}}
												options={regions}
												value={values.regions}
												placeholder={'Аймақ (Регион)'}
											/>
											{touched.regions && errors.regions && (
												<span className={styles.error}>{errors.regions}</span>
											)}
										</div>

										<div  className={cn(
											'w-full mb-4 relative',
											touched.cities && errors.cities && 'mb-8'
										)}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) => {
													setFieldValue('cities', value.value)
													setSelectCity(value.value)
												}}
												options={selectRegionFn(selectRegion)}
												value={values.cities}
												placeholder={'Қала/кент/ауыл (Город/поселок/село)'}
											/>
											{touched.cities && errors.cities && (
												<span className={styles.error}>{errors.cities}</span>
											)}
										</div>

										<div className={cn(
											'w-full mb-4 relative',
											touched.institutionType && errors.institutionType && 'mb-8'
										)}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) => {
													setFieldValue('institutionType', value.value)
													setSelectInstitutionType(value.value)
												}}
												options={institutionType}
												value={values.institutionType}
												placeholder={'Вид учебного заведения'}
											/>
											{touched.institutionType && errors.institutionType && (
												<span className={styles.error}>{errors.institutionType}</span>
											)}
										</div>

										<div className={cn(
											'w-full mb-4 relative',
											touched.institutions && errors.institutions && 'mb-8'
										)}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) =>
													setFieldValue('institutions', value.value)
												}
												options={institutions}
												value={values.institutions}
												placeholder={'Оқу орны (Учебное заведение)'}
											/>
											{touched.institutions && errors.institutions && (
												<span className={styles.error}>{errors.institutions}</span>
											)}
										</div>

										<div className={cn(
											'w-full mb-4 relative',
											touched.formStudy && errors.formStudy && 'mb-8'
										)}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) =>
													setFieldValue('formStudy', value.value)
												}
												options={formStudy}
												value={values.formStudy}
												placeholder={'Оқу түрі (Форма обучения)'}
											/>
											{touched.formStudy && errors.formStudy && (
												<span className={styles.error}>{errors.formStudy}</span>
											)}
										</div>

										<CustomSelectForm
											styles={stylesSelect}
											className={'mb-4'}
											onChange={(value: { value: string; label: string }) =>
												setFieldValue('educationProgram', value.value)
											}
											options={educationProgram}
											value={values.educationProgram}
											placeholder={
												'Болжамдық білім беру бағдарламасы (Предполагаемая группа образовательных программ)'
											}
										/>
										<CustomSelectForm
											styles={stylesSelect}
											className={'mb-4'}
											onChange={(value: { value: string; label: string }) =>
												setFieldValue('achievements', value.value)
											}
											options={achievements}
											value={values.achievements}
											placeholder={'Награды и достижение'}
										/>
										<CustomSelectForm
											styles={stylesSelect}
											className={'mb-4'}
											onChange={(value: { value: string; label: string }) =>
												setFieldValue('formPayment', value.value)
											}
											options={formPayment}
											value={values.formPayment}
											placeholder={
												'Предполагаемая форма оплаты за обучение в ВУЗе'
											}
										/>

										<div className={cn(
											'w-full mb-4 relative',
											touched.languages && errors.languages && 'mb-8'
										)}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) =>
													setFieldValue('languages', value.value)
												}
												options={languages}
												value={values.languages}
												placeholder={'Оқу тілі (Язык обучения)'}
											/>
											{touched.languages && errors.languages && (
												<span className={styles.error}>{errors.languages}</span>
											)}
										</div>

										<div className={cn(
											'w-full mb-4 relative',
											touched.consultantDepartment && errors.consultantDepartment && 'mb-8'
										)}>
											<CustomSelectForm
												styles={stylesSelect}
												className={'mb-0'}
												onChange={(value: { value: string; label: string }) =>
													setFieldValue('consultantDepartment', value.value)
												}
												options={consultantDepartment}
												value={values.consultantDepartment}
												placeholder={
													'Кафедра-консультант - от кого получена информация о ВУЗе)'
												}
											/>
											{touched.consultantDepartment && errors.consultantDepartment && (
												<span className={styles.error}>{errors.consultantDepartment}</span>
											)}
										</div>

										<textarea
											id="message"
											className={styles.textarea}
											name={'yourQuestion'}
											value={values.yourQuestion}
											onChange={handleChange}
											onBlur={handleBlur}
											placeholder="Сіздің сұрақ/жауап (Ваш вопрос/ответ)"
										></textarea>
										<Button
											className={'w-full'}
											appearance={isValid && dirty ? 'green' : 'red'}
											rounded={'rounded'}
											type={'submit'}
										>
											Зарегистрироваться
										</Button>
									</form>
								)}
							</Formik>
						</div>
					</div>
					<div className={styles.info}>
						<h3 className={styles.info__title}>Образовательные программы</h3>
						<div className={styles.info__row}>
							<Link
								className={styles.info__link}
								to={'/educational-programs/bakalavriat/educational-subcategory'}
							>
								Бакалавриат
							</Link>
							<Link
								className={styles.info__link}
								to={
									'/educational-programs/magistratura/educational-subcategory'
								}
							>
								Магистратура
							</Link>
							<Link
								className={styles.info__link}
								to={
									'/educational-programs/doktorantura/educational-subcategory'
								}
							>
								Докторантура
							</Link>
						</div>
					</div>
				</div>
				<ul className={styles.form__info}>
					<li className={styles.info__item}>
						После регистрации, в Личном кабинете вам будут доступны тесты
						Образовательных программ, тесты по предметам ЕНТ
					</li>
					<li className={styles.info__item}>
						1. Бакалавриат: тесты по Образовательным программам, тесты по
						предметам ЕНТ
					</li>
					<li className={styles.info__item}>
						2. Магистратура: тесты по иностранному языку, тесты на готовность к
						обучению, тесты по спец.дисциплинам
					</li>
					<li className={styles.info__item}>
						3. Докторантура: тесты на готовность к обучению, тесты по
						спец.дисциплинам
					</li>
				</ul>
			</div>
		</>
	)
}

export default ContactForm
