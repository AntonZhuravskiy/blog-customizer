import { useEffect, useRef, useState } from 'react';
import {
	type ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	onApply: (next: ArticleStateType) => void;
	onReset?: () => void;
};

export const ArticleParamsForm = ({
	initialState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [draft, setDraft] = useState<ArticleStateType>(initialState);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
		onClose: undefined,
	});

	useEffect(() => {
		setDraft(initialState);
	}, [initialState]);

	const handleToggle = () => setIsOpen((prev) => !prev);

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		onApply(draft);
	};

	const handleReset: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		setDraft(defaultArticleState);
		onApply(defaultArticleState);
		onReset?.();
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Separator />

					<Select
						title='ШРИФТ'
						options={fontFamilyOptions}
						selected={draft.fontFamilyOption}
						onChange={(option) =>
							setDraft((prev) => ({ ...prev, fontFamilyOption: option }))
						}
						placeholder='Выберите шрифт'
					/>

					<RadioGroup
						name='font-size'
						title='РАЗМЕР ШРИФТА'
						options={fontSizeOptions}
						selected={draft.fontSizeOption}
						onChange={(option) =>
							setDraft((prev) => ({ ...prev, fontSizeOption: option }))
						}
					/>

					<Select
						title='ЦВЕТ ТЕКСТА'
						options={fontColors}
						selected={draft.fontColor}
						onChange={(option) =>
							setDraft((prev) => ({ ...prev, fontColor: option }))
						}
						placeholder='Выберите цвет текста'
					/>

					<Select
						title='ЦВЕТ ФОНА'
						options={backgroundColors}
						selected={draft.backgroundColor}
						onChange={(option) =>
							setDraft((prev) => ({ ...prev, backgroundColor: option }))
						}
						placeholder='Выберите цвет фона'
					/>

					<RadioGroup
						name='content-width'
						title='ШИРИНА КОНТЕЙНЕРА'
						options={contentWidthArr}
						selected={draft.contentWidth}
						onChange={(option) =>
							setDraft((prev) => ({ ...prev, contentWidth: option }))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
