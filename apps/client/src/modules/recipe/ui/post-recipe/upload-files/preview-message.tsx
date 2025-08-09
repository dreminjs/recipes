export const PreviewMessage = () => {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
      <div className="text-center p-4">
        <p className="mt-2 text-sm text-gray-600">
          Превью рецептов появится здесь
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Рекомендуемый размер: 1200×800px
        </p>
      </div>
    </div>
  );
};
