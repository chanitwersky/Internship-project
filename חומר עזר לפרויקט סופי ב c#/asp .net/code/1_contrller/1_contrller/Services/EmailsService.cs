using _1_contrller.Models;

namespace _1_contrller.Services
{
    public class EmailsService
    {
        private List<Email> _emails = new List<Email>();

        public List<Email> GetAll()
        {
            return _emails;
        }

        public Email? GetById(int id)
        {
            return _emails.Find(email => email.Id == id);
        }

        public void Add(Email email)
        {
            _emails.Add(email);
        }

        public bool Remove(int id)
        {
            var email = _emails.Find(email => email.Id == id);
            if (email == null)
            {
                return false;
            }

            return _emails.Remove(email);
        }

        // TODO: Put
    }
}
