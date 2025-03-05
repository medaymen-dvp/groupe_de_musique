<?php





namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class GroupeMusic
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $origine = null;

    #[ORM\Column(length: 255)]
    private ?string $ville = null;

    #[ORM\Column]
    private ?int $anneeDebut = null;

    #[ORM\Column(nullable: true)]
    private ?int $anneeSeparation = null;

    // Modifications pour permettre à 'fondateurs' d'être vide

    #[ORM\Column(type: "json", nullable: true)]
    private ?array $fondateurs = null;
    #[ORM\Column(nullable: true)]
    private ?int $membres = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $courantMusical = null;

    #[ORM\Column(type: "text")]
    private ?string $presentation = null;

    // Getters et Setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;
        return $this;
    }

    public function getOrigine(): ?string
    {
        return $this->origine;
    }

    public function setOrigine(string $origine): self
    {
        $this->origine = $origine;
        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): self
    {
        $this->ville = $ville;
        return $this;
    }

    public function getAnneeDebut(): ?int
    {
        return $this->anneeDebut;
    }

    public function setAnneeDebut(int $anneeDebut): self
    {
        $this->anneeDebut = $anneeDebut;
        return $this;
    }

    public function getAnneeSeparation(): ?int
    {
        return $this->anneeSeparation;
    }

    public function setAnneeSeparation(?int $anneeSeparation): self
    {
        $this->anneeSeparation = $anneeSeparation;
        return $this;
    }

    public function getFondateurs(): ?array
    {
        return $this->fondateurs;
    }

    public function setFondateurs(?array $fondateurs): self
    {
        $this->fondateurs = $fondateurs;
        return $this;
    }

    public function getMembres(): ?int
    {
        return $this->membres;
    }

    public function setMembres(?int $membres): self
    {
        $this->membres = $membres;
        return $this;
    }

    public function getCourantMusical(): ?string
    {
        return $this->courantMusical;
    }

    public function setCourantMusical(mixed $param): static
    {
        $this->courantMusical = is_string($param) ? $param : null;
        return $this;
    }

    public function getPresentation(): ?string
    {
        return $this->presentation;
    }

    public function setPresentation(string $presentation): self
    {
        $this->presentation = $presentation;
        return $this;
    }
}
