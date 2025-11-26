import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLDivElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	// Обработчик клика вне области, исключающий ArrowButton
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				isOpen &&
				target instanceof Node &&
				!asideRef.current?.contains(target) &&
				!arrowButtonRef.current?.contains(target)
			) {
				setIsOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[0]) => {
		setFormState((prev) => ({
			...prev,
			fontFamilyOption: option,
		}));
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[0]) => {
		setFormState((prev) => ({
			...prev,
			fontSizeOption: option,
		}));
	};

	const handleFontColorChange = (option: (typeof fontColors)[0]) => {
		setFormState((prev) => ({
			...prev,
			fontColor: option,
		}));
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[0]
	) => {
		setFormState((prev) => ({
			...prev,
			backgroundColor: option,
		}));
	};

	const handleContentWidthChange = (option: (typeof contentWidthArr)[0]) => {
		setFormState((prev) => ({
			...prev,
			contentWidth: option,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<div ref={arrowButtonRef}>
				<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			</div>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<div ref={asideRef}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<div className={styles.title}>
							<Text size={18} weight={800} uppercase>
								ЗАДАЙТЕ ПАРАМЕТРЫ
							</Text>
						</div>
						<div className={styles.fieldGroup}>
							<Select
								title='шрифт'
								selected={formState.fontFamilyOption}
								options={fontFamilyOptions}
								onChange={handleFontFamilyChange}
							/>
						</div>
						<div className={styles.separatorWrapper}>
							<Separator />
						</div>
						<div className={styles.fieldGroup}>
							<RadioGroup
								title='размер шрифта'
								name='fontSize'
								selected={formState.fontSizeOption}
								options={fontSizeOptions}
								onChange={handleFontSizeChange}
							/>
						</div>
						<div className={styles.separatorWrapper}>
							<Separator />
						</div>
						<div className={styles.fieldGroup}>
							<Select
								title='цвет шрифта'
								selected={formState.fontColor}
								options={fontColors}
								onChange={handleFontColorChange}
							/>
						</div>
						<div className={styles.separatorWrapper}>
							<Separator />
						</div>
						<div className={styles.fieldGroup}>
							<Select
								title='цвет фона'
								selected={formState.backgroundColor}
								options={backgroundColors}
								onChange={handleBackgroundColorChange}
							/>
						</div>
						<div className={styles.separatorWrapper}>
							<Separator />
						</div>
						<div className={styles.fieldGroup}>
							<Select
								title='ширина контента'
								selected={formState.contentWidth}
								options={contentWidthArr}
								onChange={handleContentWidthChange}
							/>
						</div>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='button'
								type='clear'
								onClick={handleReset}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</div>
			</aside>
		</>
	);
};
