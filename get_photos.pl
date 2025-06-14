#!C:/Strawberry/perl/bin/perl.exe
use strict;
use warnings;
use CGI;
use JSON;
use MIME::Base64;
use File::Slurp;

my $q = CGI->new;
print $q->header('application/json');

my $user = $q->param('user') || '';
my $dir = "user_uploads/$user";

unless (-d $dir) {
    print encode_json([]);
    exit;
}

opendir(my $dh, $dir) or die "Can't open $dir: $!";
my @images = grep { /\.(jpg|jpeg|png|gif)$/i } readdir($dh);
closedir($dh);

my @base64_images;

foreach my $img (@images) {
    my $path = "$dir/$img";
    next unless -f $path;
    my $data = read_file($path, binmode => ':raw');

    my $mime = $img =~ /\.png$/i ? 'image/png' :
               $img =~ /\.gif$/i ? 'image/gif' : 'image/jpeg';

    my $base64 = encode_base64($data, '');
    push @base64_images, "data:$mime;base64,$base64";
}

print encode_json(\@base64_images);
