import { IPostIngredientForm, useGetIngredients, usePostIngredient } from 'apps/client/src/shared';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export const useIngredients = () => {
  const [title, setTitle] = useState('');

  const [limit,setLimit] = useState(5)

  const [value] = useDebounce(title, 500);

  const { ingredients } = useGetIngredients({ page: 0, limit: 5 });

  const [selectedItems,setSelectedItems] = useState<string[]>([])

  const [isModalVisible, setIsModalVisible] =
    useState(false);

    const [isHeadcheckboxChecked,setIsHeadCheckboxChecked] = useState(false)

  const handleSelectItemId = (selectedId: string) => {
    if(selectedItems.includes(selectedId)){
      setSelectedItems(prev => prev.filter(id => id != selectedId))
      setIsHeadCheckboxChecked(false)
    }else {
      setSelectedItems(prev => [...prev,selectedId])
      setIsHeadCheckboxChecked(false)
    }
    const totalSelected = selectedItems?.includes(selectedId)
      ? selectedItems.length - 1
      : selectedItems && selectedItems.length + 1;

    if (
      totalSelected === limit ||
      totalSelected === ingredients?.items.length
    ) {
      setIsHeadCheckboxChecked(true);
    }
  }

  const handleSelectAllItems = () => {
    if(ingredients?.items.length && selectedItems.length !== ingredients?.items.length){
      setSelectedItems([...ingredients?.items.map(el => el.id)])
      setIsHeadCheckboxChecked(true)
    }else {
      setSelectedItems([])
      setIsHeadCheckboxChecked(false)
    }
  }

  const handleToggleModalVisibility = () =>
    setIsModalVisible((prev) => !prev);

  const {
    postIngredient,
    postIngredientIsError,
    postIngredientIsLoading,
    postIngredientIsSuccess,
  } = usePostIngredient();

  const handlePost = (data:IPostIngredientForm) => {
    setIsModalVisible(true)
    postIngredient(data)
  }

  return {
    title,
    ingredients,
    onToggleModalVisibility: handleToggleModalVisibility,
    isModalVisible,
    handlePost,
    postIsError: postIngredientIsError,
    postIsLoading: postIngredientIsLoading,
    postIsSuccess: postIngredientIsSuccess,
    onSelectItemId: handleSelectItemId,
    onSelectAllItems:handleSelectAllItems,
    isHeadcheckboxChecked,
    selectedItems,
  };
};
