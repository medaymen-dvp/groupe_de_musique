<?php

namespace App\Controller;

use App\Entity\GroupeMusic;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class SavecontrollerController extends AbstractController
{
    #[Route('/api/savegroupemusic', name: 'app_savegroupemusic', methods: ['POST'])]
    public function saveGroupMusic(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Décoder les données JSON envoyées dans la requête
        $data = json_decode($request->getContent(), true);



        // Initialiser une variable pour suivre les erreurs
        $errors = [];

        foreach ($data as $groupeData) {
            // Normaliser les clés du tableau


            // Convertir les valeurs des chaînes en UTF-8
           // $normalizedData = $this->convertToUtf8($normalizedData);

            // Vérification des données reçues


            // Création de l'entité GroupeMusic
            $groupeMusic = new GroupeMusic();
            $groupeMusic->setNom($groupeData['Nom du groupe']);
            $groupeMusic->setOrigine($groupeData['Origine']);
            $groupeMusic->setVille($groupeData['Ville']);
            $groupeMusic->setAnneeDebut((int)$groupeData['Année début']);
            $groupeMusic->setAnneeSeparation(isset($groupeData['Année séparation']) ? (int)$groupeData['Année séparation'] : null);




            if (isset($groupeData['Fondateurs'])) {
                $tab=[(string)$groupeData['Fondateurs']];
                $groupeMusic->setFondateurs($tab);
            } else {
                $groupeMusic->setFondateurs(null);
            }

            $groupeMusic->setMembres(isset($groupeData['Membres']) ? (int)$groupeData['Membres'] : null);
            $groupeMusic->setCourantMusical($groupeData['Courant musical'] ?? null);
            $groupeMusic->setPresentation($groupeData['Présentation']);



            // Persister l'entité dans la base de données
            $entityManager->persist($groupeMusic);
            $entityManager->flush();
        }

        // Si des erreurs ont été rencontrées, retourner un message d'erreur


        // Appliquer les changements à la base de données
        //$entityManager->flush();

        // Retourner une réponse JSON indiquant que les groupes ont été enregistrés avec succès
        return $this->json(['message' => 'Groupes de musique enregistrés avec succès.'], JsonResponse::HTTP_CREATED);
    }

    // Fonction pour normaliser les clés du tableau

    // Fonction pour valider les données du groupe


    // Fonction pour convertir les données en UTF-8

}
