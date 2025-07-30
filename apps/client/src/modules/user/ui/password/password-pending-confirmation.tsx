import Link from 'next/link';
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline';

export const EmailPendingConfirmationPage = () => {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8 max-w-md w-full text-center">
        {/* Иконка */}
        <div className="mx-auto bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <EnvelopeOpenIcon className="h-8 w-8 text-amber-600" />
        </div>

        {/* Заголовок */}
        <h2 className="text-2xl font-bold text-amber-900 mb-3">
          Проверьте вашу почту
        </h2>

        {/* Описание */}
        <p className="text-amber-800 mb-6">
          Мы отправили письмо с ссылкой для подтверждения. Пожалуйста, проверьте
          вашу электронную почту и следуйте инструкциям в письме.
        </p>

        {/* Дополнительная информация */}
        <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-100">
          <p className="text-sm text-amber-700">
            {' Не получили письмо? Проверьте папку "Спам"'}
          </p>
        </div>

        {/* Ссылка на главную */}
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors font-medium"
        >
          На главную
        </Link>
      </div>
    </div>
  );
};
